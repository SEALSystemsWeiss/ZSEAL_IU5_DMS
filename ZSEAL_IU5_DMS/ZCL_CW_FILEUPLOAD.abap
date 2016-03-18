class ZCL_CW_FILEUPLOAD definition
  public
  final
  create public .

public section.
*"* public components of class ZCL_CW_FILEUPLOAD
*"* do not include other source files here!!!

  interfaces IF_HTTP_EXTENSION .
protected section.
*"* protected components of class ZCL_CW_FILEUPLOAD
*"* do not include other source files here!!!
private section.
*"* private components of class ZCL_CW_FILEUPLOAD
*"* do not include other source files here!!!
ENDCLASS.



CLASS ZCL_CW_FILEUPLOAD IMPLEMENTATION.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Instance Public Method ZCL_CW_FILEUPLOAD->IF_HTTP_EXTENSION~HANDLE_REQUEST
* +-------------------------------------------------------------------------------------------------+
* | [--->] SERVER                         TYPE REF TO IF_HTTP_SERVER
* +--------------------------------------------------------------------------------------</SIGNATURE>
METHOD if_http_extension~handle_request.

  TYPES: BEGIN OF local_type_response,
             success TYPE string,
             msg     TYPE string,
             data    TYPE ztt_scnblog2,
           END OF local_type_response.

* Structures
  DATA: ls_response TYPE local_type_response,
        lvs_origin TYPE string.

* Variables
  DATA: l_rc        TYPE i.

* Variables
  DATA: l_verb      TYPE string,
        l_path_info TYPE string,
        l_resource  TYPE string,
        l_param_1   TYPE string,
        l_param_2   TYPE string,
        txt         TYPE string,
        w_body      TYPE string,
        request_data  TYPE xstring,
        lv_value        TYPE string,
        ls_draw         TYPE draw.




* retrieving the request method (post, get, put, delete)
  l_verb = server->request->get_header_field( name = '~request_method' ).

* Retrieving the parameters passed in the URL
  l_path_info = server->request->get_header_field( name = '~path_info' ).

* allow cross site access to data..
*  lvs_origin = server->request->get_header_field( 'Origin' ).


  SHIFT l_path_info LEFT BY 1 PLACES.
  SPLIT l_path_info AT '/' INTO l_resource
                               l_param_1
                                l_param_2.

* Only methods GET, POST, PUT, DELETE are allowed
  IF ( l_verb NE 'GET' ) AND ( l_verb NE 'POST' ) AND
     ( l_verb NE 'PUT' ) AND ( l_verb NE 'DELETE' ).

    " For any other method the service should return the error code 405
    CALL METHOD server->response->set_status( code = '405'
      reason = 'Method not allowed' ).

    CALL METHOD server->response->set_header_field( name = 'Allow'
      value = 'POST, GET' ).
    EXIT.
  ENDIF.

  CASE l_verb.
    WHEN 'GET'.
      DATA:
            w_len TYPE i,
            li_dttrg    TYPE TABLE OF dms_data_carrier,
            li_temp_dttrg TYPE  dms_data_carrier.
      CALL FUNCTION 'CV120_GET_DATA_CARRIER'
        EXPORTING
          pf_kpro    = 'X'
        TABLES
          ptx_dclist = li_dttrg.
      IF sy-subrc <> 0.
        CALL METHOD server->response->set_status( code = '500' reason = 'No data storage found.' ).
        EXIT.
      ENDIF.
      LOOP AT li_dttrg INTO li_temp_dttrg.
        CONCATENATE li_temp_dttrg-dttrg ':'  w_body INTO w_body.
      ENDLOOP.

      w_len = strlen( w_body ).
      w_len = w_len - 1.
      w_body = w_body+0(w_len).

    WHEN 'POST'.   " C (Create)

*   Retrieve document key
      lv_value = server->request->get_form_field( 'type' ).
      ls_draw-dokar = lv_value.
      lv_value = server->request->get_form_field( 'number' ).
      ls_draw-doknr = lv_value.
      lv_value = server->request->get_form_field( 'version' ).
      ls_draw-dokvr = lv_value.
      lv_value = server->request->get_form_field( 'part' ).
      ls_draw-doktl = lv_value.
      lv_value = server->request->get_form_field( 'dttrg' ).
      ls_draw-dttrg = lv_value.


      CLEAR: ls_response,
             l_rc.
      DATA: raw TYPE xstring,
              rawstr TYPE string,
              utf8_converter TYPE REF TO cl_abap_conv_in_ce.

      raw = server->request->get_raw_message( ).
      utf8_converter = cl_abap_conv_in_ce=>create( encoding = 'UTF-8' ).
      CALL METHOD utf8_converter->convert
        EXPORTING
          input = raw
        IMPORTING
          data  = rawstr.


      DATA: lo_entity  TYPE REF TO if_http_entity.
      DATA: l_data     TYPE string,
            l_filename TYPE string.
      lo_entity = server->request->get_multipart( 1 ).
      IF lo_entity IS BOUND.
        " If you want to retrieve the original name of the file
        l_filename = lo_entity->get_header_field( '~content_filename' ).
        " If the content of the file is not binary you can retrieve with the GET_CDATA,
        " otherwise you will have to use the GET_DATA method
        CALL METHOD lo_entity->get_cdata
          RECEIVING
            data = l_data.
      ENDIF.

      DATA : lif_ixml TYPE REF TO if_ixml ,
           lif_ixml_document TYPE REF TO if_ixml_document ,
           lif_ixml_stream_factory TYPE REF TO if_ixml_stream_factory ,
           lif_ixml_istream TYPE REF TO if_ixml_istream ,
           lif_ixml_parser TYPE REF TO if_ixml_parser ,
           lif_ixml_parse_error TYPE REF TO if_ixml_parse_error ,
           lif_ixml_node TYPE REF TO if_ixml_node,
           node          TYPE REF TO if_ixml_node,
           lv_error_count TYPE i,
           lv_index TYPE i.
**-- Create the Main Factory
      lif_ixml = cl_ixml=>create( ).

**-- Create the Initial Document
      lif_ixml_document = lif_ixml->create_document( ).

**-- Create a Stream Factory
      lif_ixml_stream_factory = lif_ixml->create_stream_factory( ).

**-- Create an Input Stream
      lif_ixml_istream       = lif_ixml_stream_factory->create_istream_string( string = l_data ).

**-- Create a Parser
      lif_ixml_parser = lif_ixml->create_parser(
          document       = lif_ixml_document
          istream        = lif_ixml_istream
          stream_factory = lif_ixml_stream_factory
      ).

**-- check errors in parsing
      IF lif_ixml_parser->parse( ) <> 0.
        IF lif_ixml_parser->num_errors( ) <> 0.
          lv_error_count = lif_ixml_parser->num_errors( ).
          lv_index = 0.
          WHILE lv_index < lv_error_count.
            lif_ixml_parse_error = lif_ixml_parser->get_error( index = lv_index ).
            lv_index = lv_index + 1.
          ENDWHILE.
        ENDIF.
      ENDIF.

**-- Close the Input Stream after Parsing
      lif_ixml_istream->close( ).

      CONCATENATE '<html>'
            '<head>'
*                '<title>SEAL Upload was successful</title>'
            '</head>'
            '<body>'
            '[200]:Upload successful!'
            '</body>'
            '</html>'
            INTO w_body.


*      server->request->get_raw_message(
*        RECEIVING
*          data = request_data    " HTTP message
*        EXCEPTIONS
*          OTHERS = 1
*        ).
*      IF sy-subrc <> 0.
*        WRITE: / 'Error printing the request'.
*      ELSE.
*        MOVE request_data TO txt.
*        WRITE: / 'Request: ', request_data.
*        WRITE: / txt.
*      ENDIF.


*     Retrieve form data
*      ls_contact-email     = server->request->get_form_field('email').



  ENDCASE.


*  if lvs_origin ne space.
*    server->response->set_header_field(
*    exporting
*      name = 'Access-Control-Allow-Origin' value = lvs_origin ).
*
*    server->response->set_header_field(
*    exporting
*      name = 'Access-Control-Allow-Credentials' value = 'true').
*
*    server->response->set_header_field(
*      exporting name = 'Access-Control-Allow-Methods'
*                value = 'OPTIONS, GET, POST, DELETE, PUT').
*
*    server->response->set_header_field(
*      exporting name = 'Access-Control-Allow-Headers'
*                value = 'authorization, access').
*  endif.


  server->response->set_header_field( name = 'Access-Control-Allow-Origin' value = '*' ).
  server->response->set_header_field( name  = 'Access-Control-Allow-Methods' value = 'POST, GET' ).


  CALL METHOD server->response->set_cdata( data = w_body ).
*  CALL METHOD server->response->set_cdata( data = 'Service Ok!' ).
*  server->response->set_status( code = 200 reason = 'OK' ).

ENDMETHOD.
ENDCLASS.
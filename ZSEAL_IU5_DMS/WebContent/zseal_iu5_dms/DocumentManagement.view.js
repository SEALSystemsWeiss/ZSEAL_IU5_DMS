sap.ui.jsview("zseal_iu5_dms.DocumentManagement",
{

    /**
     * Specifies the Controller belonging to this View. In the case that it is not implemented, or that "null" is
     * returned, this View does not have a Controller.
     * 
     * @memberOf zseal_iu5_dms.DocumentManagement
     */
    getControllerName : function()
    {
      return "zseal_iu5_dms.DocumentManagement";
    },

    /**
     * Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
     * Since the Controller is given to this method, its event handlers can be attached right away.
     * 
     * @memberOf zseal_iu5_dms.DocumentManagement
     */
    createContent : function(oController)
    {
      var dttrg;
      // header
      var oAppHed = new sap.ui.commons.ApplicationHeader("appHeader");
      oAppHed.setDisplayWelcome(false);
      oAppHed.setDisplayLogoff(false);
      oAppHed.setLogoText("SEAL SAPUI5 Prototype");
      oAppHed.setLogoSrc("./images/seal.ico");
      oAppHed.placeAt("header");
      // Menu
      // Function to handle the select event of the items
      var handleSelect = function(oEvent)
      {
        var itemid = oEvent.getParameter("item").getId();
        if (itemid == 'info')
        {
          openInfoDialog();
        }
        else
        	{
        	(sap.ui.getCore().applyTheme(itemid)); 
        	}
      };

      function openInfoDialog()
      {
        var oDetailDialog = new sap.ui.commons.Dialog(
        {
          minWidth : "600px"
        });
        oDetailDialog.setTitle("Info");
        var oImage = new sap.ui.commons.Image(
        {
          // width : "200px",
          src : "./images/seal.jpg"
        });
        // oImage.setAlt("alternative image text for image");
        var oSimpleForm = new sap.ui.layout.form.SimpleForm(
        {
          content : [ new sap.ui.core.Title(
          {
            text : "SEAL Systems"
          }), oImage, ]
        });
        oDetailDialog.addContent(oSimpleForm);
        oDetailDialog.open();
      }
      ;

      // UI elements
      var oMenuBar = new sap.ui.commons.MenuBar();
      // Menu 'HELP'
      var oMenubarItem1 = new sap.ui.commons.MenuItem("menuitem-1",
      {
        text : "Help"
      });
      // Create a menu instance for the "Project" menu
      var oMenu1 = new sap.ui.commons.Menu("menu1");
      oMenubarItem1.setSubmenu(oMenu1);

      var oMenuItem1 = new sap.ui.commons.MenuItem("info",
      {
        text : "Info"
      });
      oMenu1.addItem(oMenuItem1);
      oMenuItem1.attachSelect(handleSelect);

      // Menu 'THEMES'
      var oMenubarItem2 = new sap.ui.commons.MenuItem("menuitem-2",
    		  {
    	  text : "Themes"
    		  });
      var oMenu2 = new sap.ui.commons.Menu("menu2");
      oMenubarItem2.setSubmenu(oMenu2);
      
      var oMenuItem2 = new sap.ui.commons.MenuItem("sap_bluecrystal",
    		  {
    	      text : "Bluecrystal"
    		  });
      oMenuItem2.attachSelect(handleSelect);
      oMenu2.addItem(oMenuItem2);
      
      var oMenuItem3 = new sap.ui.commons.MenuItem("sap_platinum",
    		  {
    	  text : "Platinum"
    		  });
      oMenu2.addItem(oMenuItem3);
      oMenuItem3.attachSelect(handleSelect);
      
      var oMenuItem4 = new sap.ui.commons.MenuItem("sap_goldreflection",
    		  {
    	  text : "Goldreflection"
    		  });
      oMenu2.addItem(oMenuItem4);
      oMenuItem4.attachSelect(handleSelect);

      var oMenuItem5 = new sap.ui.commons.MenuItem("sap_ux",
    		  {
    	  text : "UX"
    		  });
      oMenu2.addItem(oMenuItem5);
      oMenuItem5.attachSelect(handleSelect);
      
      var oMenuItem6 = new sap.ui.commons.MenuItem("sap_hcb",
    		  {
    	  text : "HCB"
    		  });
      oMenu2.addItem(oMenuItem6);
      oMenuItem6.attachSelect(handleSelect);

      var oMenuItem7 = new sap.ui.commons.MenuItem("base",
    		  {
    	  text : "Base"
    		  });
      oMenu2.addItem(oMenuItem7);
      oMenuItem7.attachSelect(handleSelect);

      
      oMenuBar.addItem(oMenubarItem2);
      oMenuBar.addItem(oMenubarItem1);
      
      oMenuBar.placeAt("menu");

      var oPan = new sap.ui.commons.Panel(
      {
          id : "oPan", // sap.ui.core.ID
          text : "Document Management:" // string
      // sap.ui.commons.Button
      });
      
      // create a simple CheckBox
      var oCeckbox = new sap.ui.commons.CheckBox({
      	text : 'Checkin Document',
      	tooltip : 'checked to checkin or uncheck for viewing',
      	checked : true,
      	change : function() {
      		if(oCeckbox.getChecked())
      			{
      			oFileUploader1.setEnabled(true);
      			oComboBox1.setEnabled(true);
      	        oButton2.setEnabled(true);
      	        oButton1.setText("Checkin");
      			}
      		else
      			{
      			oFileUploader1.setEnabled(false);
      			oComboBox1.setEnabled(false);
      			oButton2.setEnabled(false);
      			oButton1.setText("View");
      			}
      		}});

      var oLab1 = new sap.ui.commons.Label(
      {
          id : "oLab1", // sap.ui.core.ID
          text : 'Document Number' // string
      // sap.ui.core.Control
      });

      var oLab2 = new sap.ui.commons.Label(
      {
          id : "oLab2", // sap.ui.core.ID
          text : 'Document Type' // string
      // sap.ui.core.Control
      });

      var oLab3 = new sap.ui.commons.Label(
      {
          id : "oLab3", // sap.ui.core.ID
          text : 'Document Part' // string
      // sap.ui.core.Control
      });

      var oLab4 = new sap.ui.commons.Label(
      {
          id : "oLab4", // sap.ui.core.ID
          text : 'Document Version' // string
      // sap.ui.core.Control
      });

      var oLab5 = new sap.ui.commons.Label(
      {
          id : "oLab5", // sap.ui.core.ID
          text : 'Storage Categorie' // string
      // sap.ui.core.Control
      });

      var oText1 = new sap.ui.commons.TextField(
      {
        id : "docnumber" // sap.ui.core.ID
      });

      var oText2 = new sap.ui.commons.TextField(
      {
        id : "doctype" // sap.ui.core.ID
      });

      var oText3 = new sap.ui.commons.TextField(
      {
        id : "docpart" // sap.ui.core.ID
      });

      var oText4 = new sap.ui.commons.TextField(
      {
        id : "docversion" // sap.ui.core.ID
      });

      // Create a ComboBox
      var oComboBox1 = new sap.ui.commons.ComboBox("oComboBox",
      {
        tooltip : "Storage Categorie",
      });

      var oFileUploader1 = new sap.ui.unified.FileUploader("upload_1",
      {
          name : "test1",

          uploadUrl : "http://roesap001.sealsystems.local:8000/sap/bc/zcwfupload?sap-client=800",
          // value: "",
          width : "250px",
          tooltip : "Upload your file to the local server.",
          mimeType : "xml,text",
          fileType : "xml,txt",
          uploadOnChange : false, /* no autom. upload */
          sendXHR : true,
          typeMissmatch : function(oEvent)
          {
            var sName = oEvent.getParameter("fileName");
            var sType = oEvent.getParameter("fileType");
            var sMimeType = oFileUploader1.getMimeType();
            if (!sMimeType)
            {
              sMimeType = oFileUploader1.getFileType();
            }
            sap.ui.commons.MessageBox.show("File: " + sName + " is of type " + sType + " .Allowed types are: "
                + sMimeType + ".", "ERROR", "Wrong File type");
          },
          uploadComplete : function(oEvent)
          {
            var sResponse = oEvent.getParameter("response");
            if (sResponse)
            {
              var m = /^\[(\d\d\d)\]:(.*)$/.exec(sResponse);
              if (m[1] == "200")
              {
                sap.ui.commons.MessageBox.show("Return Code: " + m[1] + "\n" + m[2], "SUCCESS", "Upload Success");
              }
              else
              {
                sap.ui.commons.MessageBox.show("Return Code: " + m[1] + "\n" + m[2], "ERROR", "Upload Error");
              }
            }
          }
      });

      var oLab6 = new sap.ui.commons.Label(
      {
          text : "Document Original: ",
          labelFor : oFileUploader1
      });

      var oButton1 = new sap.ui.commons.Button(
      {
          text : "Checkin",
          press : function()
          {
        	  if(oCeckbox.getChecked())
    			{
	             oFileUploader1.insertParameter(new sap.ui.unified.FileUploaderParameter(
	             {
	             name : "type",
	             value : oText2.getValue()
	             }));
	             oFileUploader1.insertParameter(new sap.ui.unified.FileUploaderParameter(
	             {
	             name : "number",
	             value : oText1.getValue()
	             }));
	             oFileUploader1.insertParameter(new sap.ui.unified.FileUploaderParameter(
	             {
	             name : "version",
	             value : oText4.getValue()
	             }));
	             oFileUploader1.insertParameter(new sap.ui.unified.FileUploaderParameter(
	             {
	             name : "part",
	             value : oText3.getValue()
	             }));
	             oFileUploader1.insertParameter(new sap.ui.unified.FileUploaderParameter(
	             {
	             name : "dttrg",
	             value : oComboBox1.getValue()
	             }));
	            oFileUploader1.upload();
    			}
        	  else
        		  {
        		  // Request data storage
        		  // http://roesap001.sealsystems.local:8000/sap/bc/zcwdmsdownload?sap-client=800&type=DMO&number=CW-TEST-02&version=00&part=000; 
        		  var url = "http://roesap001.sealsystems.local:8000/sap/bc/zcwdmsdownload?sap-client=800&type=";
        		  url = url+oText2.getValue()+"&number="+oText1.getValue()+"&version="+oText4.getValue()+"&part="+oText3.getValue();
        		  popupwindow = window.open(url,'','menubar=yes,titlebar=yes,resizable=yes,toolbar=yes,location=yes,status=yes,scrollbars=yes');
        		  popupwindow.focus(); 
        		  }
          }
      });
      
      
     
      var oButton2 = new sap.ui.commons.Button(
      {
          text : "Get Storage",
          press : function()
          {
            // Request data storage
            $.ajax(
            // jQuery.sap.sjax(
            {
                type : "GET",
                url : "http://roesap001.sealsystems.local:8000/sap/bc/zcwfupload?sap-client=800",
                data : {},
                success : function(data)
                {
                  // alert("Ok\n" + data);
                  dttrg = data.split(":");
                  for ( var sKey in dttrg)
                  {
                    oComboBox1.addItem(new sap.ui.core.ListItem(
                    {
                        text : dttrg[sKey],
                        key : sKey
                    }));
                  }
                },
                error : function(data)
                {
                  alert("Failed:" + data);
                }
            });
          }
      });
      

      var oLayout1 = new sap.ui.commons.layout.HorizontalLayout();
      oLayout1.addContent(oComboBox1);
      oLayout1.addContent(oButton2);
      var oLayout = new sap.ui.commons.layout.MatrixLayout();
      oLayout.createRow(oCeckbox, 0, 0);
      oLayout.createRow(oLab1, oText1, 0);
      oLayout.createRow(oLab2, oText2, 0);
      oLayout.createRow(oLab3, oText3, 0);
      oLayout.createRow(oLab4, oText4, 0);
      // oLayout.createRow(oLab5, oComboBox1, oButton2, 0);
      oLayout.createRow(oLab5, oLayout1, 0);
      oLayout.createRow(oLab6, oFileUploader1, 0);
      oLayout.createRow(oButton1, 0, 0);
      

      oPan.addContent(oLayout).placeAt("content");

    }

});

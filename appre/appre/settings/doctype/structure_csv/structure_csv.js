// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt

frappe.ui.form.on("Structure CSV", {
// 	refresh(frm) {

// 	},
module_name: function(frm){
	  frm.set_query("doctype_name", function() {
			return {
				filters:{
					"module": frm.doc.module_name
				}
			}
	  });
	},
	doctype_name: function(frm){
	  frappe.call({
	           method: "get_fiels",
	           doc: frm.doc,
               args: {
                 doctype: frm.doc.doctype_name,
               },
      }).then(r => {
         if(r.message)
         {
           frm.refresh()
         }
      });
	},
 });

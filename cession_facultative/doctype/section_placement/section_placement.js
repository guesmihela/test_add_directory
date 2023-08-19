// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt
frappe.provide("appre");

frappe.ui.form.on("Section Placement", {
	validate(frm ,cdt, cdn) {
		        		frm.set_value("validate_doc", frm.doc.validate_doc+1);


  if( frm.doc.somme_tiers > 100 && !frm.is_new() ){
         	   frappe.throw(__("La somme des parts des tiers signée doit être inférieur ou égale 100%"))

        }
},

refresh(frm) {
	if (frm.doc.__islocal) {
			const last_doc = frappe.contacts.get_last_doc(frm);
			if (
				frappe.dynamic_link &&
				frappe.dynamic_link.doc &&
				frappe.dynamic_link.doc.name == last_doc.docname
			) {
				frm.set_value("link_doctype", frappe.dynamic_link.doctype);
				frm.set_value("link_name", frappe.dynamic_link.doc[frappe.dynamic_link.fieldname]);
			    frm.set_value("link_name", frappe.dynamic_link.doc[frappe.dynamic_link.fieldname]);


			}

		}


		if (!frm.is_new()) {

	frm.add_custom_button(__('Aller au placement'), function(){
							frappe.set_route("Form", frm.doc.link_doctype, frm.doc.link_name);
    });
        frm.call('get_t_t').then(r => {
           if (r.message) {

		if (frm.fields_dict["contact_html"] && "contact_list" in frm.doc.__onload) {
			$(this.frm.fields_dict["contact_html"].wrapper)
				.html(frappe.render_template("tiers_list", frm.doc.__onload))

				$(".btn-contact")
				.on("click", function () {
					frappe.new_doc("Tiers");
				})

		}

           }
        })


        } else {
frm.fields_dict["contact_html"] && $(frm.fields_dict["contact_html"].wrapper).html("");		}



 	},
});
 appre.LeadSectionPlacement = class LeadSectionPlacement extends frappe.ui.form.Controller  {
	refresh(frm) {
	var me = this;
		let doc = this.frm.doc;
		frappe.dynamic_link = {
			doc: doc,
			fieldname: 'name',
			doctype: 'Section Placement'
		};

		if (!this.frm.is_new()) {




		if (this.frm.fields_dict["contact_html"] && "contact_list" in this.frm.doc.__onload) {
			$(this.frm.fields_dict["contact_html"].wrapper)
				.html(frappe.render_template("tiers_placement_list", this.frm.doc.__onload))

				$(".btn-contact")
				.on("click", function () {
				frappe.new_doc("Tiers placement");
				})
				$(".delete-note-btn")
				.on("click", function () {
					//frappe.new_doc("Tiers");
					me.delete_tiers(this)
				});
		}
		} else {
this.frm.fields_dict["contact_html"] && $(this.frm.fields_dict["contact_html"].wrapper).html("");		}
	}

async delete_tiers( input_field){

			let docname = $(input_field).attr("name");
			frappe.db.delete_doc('Tiers placement', docname)

			this.frm.refresh();

			//	frappe.new_doc("Tiers");

	}




};
extend_cscript(cur_frm.cscript, new appre.LeadSectionPlacement({ frm: cur_frm }));

// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt

frappe.provide("appre");
 appre.SectionPController = class SectionPController extends frappe.ui.form.Controller  {

	refresh(frm) {
	var me = this;
		let doc = this.frm.doc;
		frappe.dynamic_link = {
			doc: doc,
			fieldname: 'name',
			doctype: 'Placement en reassurance facultative'
		};

		if (!this.frm.is_new()) {


		if (this.frm.fields_dict["section_html"] && "contact_list" in this.frm.doc.__onload) {
			$(this.frm.fields_dict["section_html"].wrapper)
				.html(frappe.render_template("Section_placement", this.frm.doc.__onload))
				.find(".btn-contact")
				.on("click", function () {
					frappe.new_doc("Section Placement");
				});
		}


		} else {
      this.frm.fields_dict["section_html"] && $(this.frm.fields_dict["section_html"].wrapper).html("");
		}
	}

};
extend_cscript(cur_frm.cscript, new appre.SectionPController({ frm: cur_frm }));
 frappe.ui.form.on("Placement en reassurance facultative", {
	refresh(frm) {
//var n= "frm.doc.numero_du_placement+1"


const date_exp = new Date(frm.doc.date_expiration)
var ladate=new Date()



if( date_exp <=  ladate){

//frappe.db.exists("Placement en reassurance facultative", {origine_du_placement: frm.doc.name}).then(exists => {  console.log(exists) // true  })
 frappe.db.count('Placement en reassurance facultative', {  filters: {
        origine_placement: frm.doc.name
    } })
    .then(count => {
     	if (count<1){
frm.add_custom_button(__('Renouveler'), function(){
	frappe.call({
    method: "appre.cession_facultative.doctype.placement_en_reassurance_facultative.btn_renouvelable.renouveller", //dotted path to server method
args: {
    'docname':  frm.doc.name,

    },    callback: function(r) {
                         	frappe.set_route("Form", "Placement en reassurance facultative", r.message)

    }
});
    });
     	}
    })




}




	   frm.call('get_section').then(r => {
           if (r.message) {
         if (!frm.is_new()) {



		if (frm.fields_dict["section_html"] && "contact_list" in frm.doc.__onload) {
			$(frm.fields_dict["section_html"].wrapper)
				.html(frappe.render_template("Section_placement", frm.doc.__onload))
				.find(".btn-contact")
				.on("click", function () {
					frappe.new_doc("Section Placement");
				});
		}


		} else {
      frm.fields_dict["section_html"] && $(frm.fields_dict["section_html"].wrapper).html("");
		}
}
        })

	},


 });

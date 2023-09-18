// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt

frappe.ui.form.on("Code postal", {
 /*refresh(frm) {
	frm.set_df_property('postal_code', 'fieldtype', 'Int');


 	},*/

 postal_code: function(frm) {
   var postal_code = frm.doc.postal_code

   if (/[^0-9]/.test(postal_code)){
   //iban1 = iban1.replace(/[^A-Z0-9\s-_]/g, "")

   frm.set_value('postal_code', "")

}
}
 	 });

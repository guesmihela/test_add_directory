// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt

frappe.ui.form.on("Compagnie assurance", {
// 	refresh(frm) {

// 	},
 insurer_code: function(frm) {
   var insurer_code = frm.doc.insurer_code

   if (/[^0-9]/.test(insurer_code)){
   //iban1 = iban1.replace(/[^A-Z0-9\s-_]/g, "")

   frm.set_value('insurer_code', "")

}
}
 });

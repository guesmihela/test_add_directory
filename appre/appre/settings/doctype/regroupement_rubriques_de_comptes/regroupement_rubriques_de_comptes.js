// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt

frappe.ui.form.on("Regroupement rubriques de comptes", {
// 	refresh(frm) {

// 	},
edit_order_grouping: function(frm) {
   var edit_order_grouping = frm.doc.edit_order_grouping

   if (/[^0-9]/.test(edit_order_grouping)){
   //iban1 = iban1.replace(/[^A-Z0-9\s-_]/g, "")

   frm.set_value('edit_order_grouping', "")

}
}
});



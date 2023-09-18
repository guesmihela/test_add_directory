// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt

frappe.ui.form.on("Taux inflation", {
taux_inflation: function(frm) {
if (  frm.doc.taux_inflation < 3 || frm.doc.taux_inflation >20){
   frm.set_value('taux_inflation', "")

}
},
annee_civile: function(frm) {
var annee_civile = frm.doc.annee_civile
if (/[^0-9]/.test(annee_civile)){

   frm.set_value('annee_civile', "")

}
if (  frm.doc.annee_civile < 2023 || frm.doc.annee_civile >2030){
   frm.set_value('annee_civile', "")

}
}
// 	refresh(frm) {

// 	},
 });

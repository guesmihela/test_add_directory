// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt

frappe.ui.form.on("Rubrique de compte", {
code_rubrique: function(frm) {
   var code_rubrique = frm.doc.code_rubrique

   if (/[^0-9]/.test(code_rubrique)){
   //iban1 = iban1.replace(/[^A-Z0-9\s-_]/g, "")

   frm.set_value('code_rubrique', "")

}
},
ordre_edition: function(frm) {
   var ordre_edition = frm.doc.ordre_edition

   if (/[^0-9]/.test(ordre_edition)){
   //iban1 = iban1.replace(/[^A-Z0-9\s-_]/g, "")

   frm.set_value('ordre_edition', "")
           frappe.msgprint(__("hello" ));


}
},

validate(frm ) {
   var num_compte_comptable = frm.doc.num_compte_comptable

frappe.db.get_single_value('Compte comptable', 'taille_compte_general')
    .then(taille_compte_general => {
    let taille = taille_compte_general
    let length = num_compte_comptable.length;

if (taille != length){
           frappe.throw(__('Le numéro de compte comptable doit respecter toujours la taille du compte général'))
}

})






}

// 	refresh(frm) {

// 	},

});



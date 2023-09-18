// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt

frappe.ui.form.on("Contrat", {
quote_part_coassurance: function(frm){
	var quote_part_coassurance = frm.doc.quote_part_coassurance

	if ( quote_part_coassurance> 100 || quote_part_coassurance <= 0){
	  	     frm.set_value('quote_part_coassurance', "")

   }
   },
taux_smp:function(frm){
	var taux_smp = frm.doc.taux_smp

	if ( taux_smp> 95 || taux_smp < 40){
	  	     frm.set_value('taux_smp', "")

   }
   },
// 	refresh(frm) {

// 	},
});
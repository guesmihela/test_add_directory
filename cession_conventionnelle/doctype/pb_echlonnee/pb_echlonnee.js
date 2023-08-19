// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt

// frappe.ui.form.on("PB echlonnee", {
// 	refresh(frm) {

// 	},
// });
frappe.ui.form.on( 'taux de PB  echelonnee',"mode_de_calcul",function(frm, cdt, cdn)  {
            var l = locals[cdt][cdn];
   	    	var mode = l.mode_de_calcul
   	    	if ( mode =="Pourcentage"){
   	    	//frm.set_df_property('pourcentagemontantformule', 'fieldtype', 'Percent');
//cur_frm.get_field("tableau_à_échelle_de_la_pb").grid.toggle_fieldtype("pourcentagemontantformule", 'Percent');
cur_frm.get_field("tableau_à_échelle_de_la_pb").grid.docfields["pourcentagemontantformule"].read_only = 1


   	    	}

});
// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt

frappe.ui.form.on("Programme de reassurance", {
/*
niveaux: function (frm) {

	    var n = frm.doc.niveaux

        if (n ){
	         frm.doc.niveaux_de_programme= []
	         for (var i = 1; i < n+1; i++) {
	         var entry = frm.add_child("niveaux_de_programme")
	         entry.niveau= i
	         refresh_field("niveaux_de_programme")

	         }
        }
	},

 	onload: function(frm) {

 	frm.get_field("niveaux_de_programme").grid.cannot_add_rows = true;


},*/
estimation_des_primes_cedees: function(frm){
if (  frm.doc.estimation_des_primes_cedees <= 0 ){
   frm.set_value('estimation_des_primes_cédées_des_traités_proportionnels', "")

}
 },
// 	refresh(frm) {

// 	},
 });
/*
  frappe.ui.form.on( 'niveau programme',"forme_de_traite",function(frm)  {

		frm.fields_dict['niveaux_de_programme'].grid.get_field('forme_de_traite').get_query = function(doc){
			let guardian_list = [];
			if(!doc.__islocal) guardian_list.push(doc.forme_de_traite);
			$.each(doc.niveaux_de_programme, function(idx, val){
				if (val.forme_de_traite) guardian_list.push(val.forme_de_traite);
			});

			return { filters: [['Forme de traite', 'name', 'not in',guardian_list]] };
	}
});*/


frappe.ui.form.on('niveau programme',"forme_de_traite",function(frm, cdt, cdn)  {

   	    	var d = locals[cdt][cdn];
   	    	var i = d.idx

   	    	d.niveau= i
   	    	frm.refresh_field("niveaux_de_programme")
   	    	i = i +1
});
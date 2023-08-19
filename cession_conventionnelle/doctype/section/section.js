// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt
frappe.provide("appre");
frappe.ui.form.on("Section", {

validate: function(frm) {

var somme =0
if ( frm.doc.taux_retention && frm.doc.taux_engagement ){
somme = frm.doc.taux_retention + frm.doc.taux_engagement
 if (somme != 100){
       frappe.throw(__("Les parts des tiers et de la rétention doivent  égales = 100% "))
        frm.set_value('taux_retention', "")

 }
}
},
 	refresh(frm) {


		if (!frm.is_new()) {
	frm.add_custom_button(__('Aller au traité'), function(){
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
        		frm.set_value("etat_doc", frm.doc.etat_doc+1);
        		frm.dirty()

        } else {
frm.fields_dict["contact_html"] && $(frm.fields_dict["contact_html"].wrapper).html("");		}

 	if (frm.doc.__islocal) {
			const last_doc = frappe.contacts.get_last_doc(frm);
			if (
				frappe.dynamic_link &&
				frappe.dynamic_link.doc &&
				frappe.dynamic_link.doc.name == last_doc.docname
			) {
				frm.set_value("link_doctype", frappe.dynamic_link.doctype);
				frm.set_value("link_name", frappe.dynamic_link.doc[frappe.dynamic_link.fieldname]);


			}

		}

 	},
 	onload: function(frm) {
 	frm.refresh();
 	   	    	frm.refresh_field("contact_html")


 	frm.get_field("methode_de_chaque__reconstitution").grid.cannot_add_rows = true;

 	frm.get_field("table_tree").grid.cannot_add_rows = true;


},
taux_interets: function(frm){
	var taux_interets = frm.doc.taux_interets

	if ( taux_interets> 10 || taux_interets <1){
	  	     frm.set_value('taux_interets', "")

   }
   },


	validate(frm ,cdt, cdn) {
	        		frm.set_value("etat_doc", frm.doc.etat_doc+1);


        if( frm.doc.etat_tiers > 100 && !frm.is_new() ){
         	   frappe.throw(__("La somme des parts des tiers signée doit être inférieur ou égale 100%"))

        }




	if (frm.doc.type_traite == "Non proportionnel" && frm.doc.echeancier_de_paiement){
	    var somme= 0

 	    for (let row of frm.doc.echeancier_de_paiement){
 	     	    var taux = row.le_taux_de_lecheancier
 	     	    somme = somme + taux
 	    }
 	    if( somme != 100)
 	            frappe.throw(__("Le total des taux de l’échéancier doit être égal = 100%."))

    }},
	nombre_de__reconstitution: function (frm) {

	    var n = frm.doc.nombre_de__reconstitution
	    if ( n> 10 || n < 1){
	  	     frm.set_value('nombre_de__reconstitution', "")
	  	     n = ""
	  	     	frm.doc.methode_de_chaque__reconstitution= []
	  	     		refresh_field("methode_de_chaque__reconstitution")
        }
        if (n ){
	         frm.doc.methode_de_chaque__reconstitution= []
	         for (var i = 1; i < n+1; i++) {
	         var entry = frm.add_child("methode_de_chaque__reconstitution")
	         entry.numero_de_reconstitution= i
	         refresh_field("methode_de_chaque__reconstitution")

	         }
        }
	},



	taux_des_depots_primes: function(frm){
	var taux_des_depots_primes = frm.doc.taux_des_depots_primes

	if ( taux_des_depots_primes> 50 || taux_des_depots_primes < 20){
	  	     frm.set_value('taux_des_depots_primes', "")

   }
   },
   taux_de_depots_sap: function(frm){
	var taux_de_depots_sap = frm.doc.taux_de_depots_sap

	if ( taux_de_depots_sap> 100 || taux_de_depots_sap < 50){
	  	     frm.set_value('taux_de_depots_sap', "")

   }},
    taux_entree_en_portefeuille_primes: function(frm){
	var taux_entree_en_portefeuille_primes = frm.doc.taux_entree_en_portefeuille_primes

	if ( taux_entree_en_portefeuille_primes> 100 || taux_entree_en_portefeuille_primes <= 0){
	  	     frm.set_value('taux_entree_en_portefeuille_primes', "")

   }},
   taux_retrait_de__portefeuille_primes: function(frm){
	var taux_retrait_de__portefeuille_primes = frm.doc.taux_retrait_de__portefeuille_primes

	if ( taux_retrait_de__portefeuille_primes> 100 || taux_retrait_de__portefeuille_primes <= 0){
	  	     frm.set_value('taux_retrait_de__portefeuille_primes', "")

   }},
    taux_entree_en_portefeuille_sinistres: function(frm){
	var taux_entree_en_portefeuille_sinistres = frm.doc.taux_entree_en_portefeuille_sinistres

	if ( taux_entree_en_portefeuille_sinistres> 100 || taux_entree_en_portefeuille_sinistres <= 0){
	  	     frm.set_value('taux_entree_en_portefeuille_sinistres', "")

   }},
    taux_retrait_de__portefeuille_sinistres: function(frm){
	var taux_retrait_de__portefeuille_sinistres = frm.doc.taux_retrait_de__portefeuille_sinistres

	if ( taux_retrait_de__portefeuille_sinistres> 100 || taux_retrait_de__portefeuille_sinistres <= 0){
	  	     frm.set_value('taux_retrait_de__portefeuille_sinistres', "")

   }},
      avis_de_sinistre: function(frm){
	var avis_de_sinistre = frm.doc.avis_de_sinistre

	if ( avis_de_sinistre <= 0){
	  	     frm.set_value('avis_de_sinistre', "")

   }},

 limite_engagement: function(frm){
var limite = 0
limite = frm.doc.limite + frm.doc.limite_engagement

   frm.set_value('limite_t_p', limite)
 },

 limite: function(frm){
var limite = 0
limite = frm.doc.limite + frm.doc.limite_engagement

   frm.set_value('limite_t_p', limite)


 },
 nombre_de_pleins_limite: function(frm){
 if (frm.doc.type_du_plein == "Plein fixe"){
 var limite = 0
limite = frm.doc.nombre_de_pleins_limite* frm.doc.valeur_du_plein

   frm.set_value('limite_plein', limite)
 }
 },
 valeur_du_plein: function(frm){
 if (frm.doc.type_du_plein == "Plein fixe"){
 var limite = 0
limite = frm.doc.nombre_de_pleins_limite * frm.doc.valeur_du_plein

   frm.set_value('limite_plein', limite)
 }

 },
  taux_retention: function(frm){

 if (  frm.doc.taux_retention <= 0 || frm.doc.taux_retention >100){
   frm.set_value('taux_retention', "")
}

 },
 taux_engagement: function(frm){
if (  frm.doc.taux_engagement <=0 || frm.doc.taux_engagement >100){
   frm.set_value('taux_engagement', "")

}
 },
   sinistre_au_comptant: function(frm){
	var sinistre_au_comptant = frm.doc.sinistre_au_comptant

	if ( sinistre_au_comptant <= 0){
	  	     frm.set_value('sinistre_au_comptant', "")

   }}




 });

 appre.LeadController = class LeadController extends frappe.ui.form.Controller  {
	refresh(frm) {
	var me = this;
		let doc = this.frm.doc;
		frappe.dynamic_link = {
			doc: doc,
			fieldname: 'name',
			doctype: 'Section'
		};

		if (!this.frm.is_new()) {

		if (this.frm.fields_dict["html_tree"] && "branch_cat_list" in this.frm.doc.__onload) {
			$(this.frm.fields_dict["html_tree"].wrapper)
				.html(frappe.render_template("branche_list", this.frm.doc.__onload))

				$(".completion-checkbox").on("click", function() {
						me.update_status(this);
					});
		}



		if (this.frm.fields_dict["contact_html"] && "contact_list" in this.frm.doc.__onload) {
			$(this.frm.fields_dict["contact_html"].wrapper)
				.html(frappe.render_template("tiers_list", this.frm.doc.__onload))

				$(".btn-contact")
				.on("click", function () {
				frappe.new_doc("Tiers");
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
			frappe.db.delete_doc('Tiers', docname)

			this.frm.refresh();

			//	frappe.new_doc("Tiers");

	}
async update_status (input_field) {
		//let completed = $(input_field).prop("checked") ? 1 : 0;
		let docnam = $(input_field).attr("name");
		let att = $(input_field).attr("att");
		let pro = ""

if (att =="Garantie"){		 pro = $(input_field).attr("pro");

     //  let row = this.frm.add_child("table_tree", { affectation_de: att, produitsgaranties: docnam, produit: pro})

		}/*else{
		       let row = this.frm.add_child("table_tree", { affectation_de: att, produitsgaranties: docnam})

		}
       //doc.save()
       this.frm.save();

        this.frm.refresh_field("table_tree")
        this.refresh();
        */
			frappe.call({
						method: "add_note",
						doc: me.frm.doc,
						args: {
							note: docnam,
							att : att,
							pro : pro
						},
						callback: function(r) {
							if (!r.exc) {
							frappe.msgprint(__('Document updated successfully' + att + docnam ));


						     	me.frm.refresh_field("html_tree");

								me.frm.refresh_field("table_tree");
								me.refresh();
							}else{
							frappe.msgprint(__('Document updated successfully' + att + docnam ));
							}

						}
					});

	}



};
extend_cscript(cur_frm.cscript, new appre.LeadController({ frm: cur_frm }));



frappe.ui.form.on('taux de PB  echelonnee',"taux_de_pb",function(frm, cdt, cdn)  {

            var i = 1
   	    	var d = locals[cdt][cdn];
   	    	d.numéro_de_tranche= i
   	    	frm.refresh_field("taux_echelonnee")
   	    	i = i +1
});
frappe.ui.form.on( 'Echeancier de Paiement child',"le_taux_de_lecheancier",function(frm, cdt, cdn)  {
           	    	var l = locals[cdt][cdn];
           	    	var taux = l.le_taux_de_lecheancier
           	    	if( taux< 0  || taux> 100){
           	    	            l.le_taux_de_lecheancier = ""
           	    	}


})

frappe.ui.form.on( 'Echeancier de Paiement child',"date_decheancier",function(frm, cdt, cdn)  {
   	    	var l = locals[cdt][cdn];
   	    	var date = l.date_decheancier
   	    	var jj =date.substr(0, 2)
   	    	var bar =date.substr(2, 1)
   	    	var mm =date.substr(3, 2)
   	        if (/[^0-9]/.test(jj)){
   	           	    	   	    	l.date_decheancier = ""
   	    	   }

   	        if (/[^0-9]/.test(mm)){
   	           	    	   	    	l.date_decheancier = ""
   	    	   }
   	    	if (bar != "/"){
   	    	   	    	l.date_decheancier = ""
   	    	}
   	    	if (jj > 31 || jj <1){
   	    	   	       	    	l.date_decheancier = ""

   	    	}
   	    	if (mm>12 || mm<1){
   	    	   	       	    	l.date_decheancier = ""

   	    	}
   	    	if (( mm== "04" || mm== "06" || mm== "09" || mm =="11" )&&(jj> 30)){
   	    	   	       	    	l.date_decheancier = ""
   	    	}
   	    	if (mm=="02"&& jj>29){
   	    	   	    	l.date_decheancier = ""
   	    	}
   	    	var i = 0

   	    	for (let row of frm.doc.echeancier_de_paiement){
   	    	i++
}
 	    if (i>1){
 	    i=i-2
   	    var d_c = frm.doc.echeancier_de_paiement[i]["date_decheancier"]
   	    var mm_c =d_c.substr(3, 2)
   	   	var jj_c =d_c.substr(0, 2)

   	    if (mm < mm_c){
   	       	    	   	    	l.date_decheancier = ""
   	       	    	   	    	frappe.msgprint("Les dates doivent respecter un ordre croissant")
   	    }
   	    if (mm == mm_c && jj < jj_c ){

   	    	l.date_decheancier = ""
   	       	    	   	    	frappe.msgprint("Les dates doivent respecter un ordre croissant")
   	    }

}

   	    	frm.refresh_field("echeancier_de_paiement")
})

frappe.ui.form.on('info contrat line slip', {
	liste_de_contrats_add: function(frm, cdt, cdn){
	var l = locals[cdt][cdn];
	var engagement_line_slip =frm.doc.engagement_line_slip
	   if (frm.doc.fonctionnement =="Limite fixe pour une liste de contrats"){

	   	    	 l.fixe = "oui"
	   	    	 l.engagement_line_slip = engagement_line_slip
	   }
	   	    	}
	   	    	})
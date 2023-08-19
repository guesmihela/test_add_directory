// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt
frappe.provide("appre");
 appre.SectionController = class SectionController extends frappe.ui.form.Controller  {

	refresh(frm) {




	var me = this;
		let doc = this.frm.doc;
		frappe.dynamic_link = {
			doc: doc,
			fieldname: 'name',
			doctype: 'Traite'
		};

		if (!this.frm.is_new()) {



		if (this.frm.fields_dict["section_html"] && "contact_list" in this.frm.doc.__onload) {
			$(this.frm.fields_dict["section_html"].wrapper)
				.html(frappe.render_template("section", this.frm.doc.__onload))
				.find(".btn-contact")
				.on("click", function () {
					frappe.new_doc("Section");
				});
		}


		} else {
      this.frm.fields_dict["section_html"] && $(this.frm.fields_dict["section_html"].wrapper).html("");
		}
	}

};
extend_cscript(cur_frm.cscript, new appre.SectionController({ frm: cur_frm }));
frappe.ui.form.on("Traite", {
/*
//traite qpart
 limite_t_p: function(frm){

 },*/
 valeur_lindice: function(frm){
  if (  frm.doc.valeur_lindice < 2 || frm.doc.valeur_lindice >15){
   frm.set_value('valeur_lindice', "")
}
 },
 taux_inflation_clause_sta: function(frm){
  if (  frm.doc.taux_inflation_clause_sta < 5 || frm.doc.taux_inflation_clause_sta >20){
   frm.set_value('taux_inflation_clause_sta', "")
}
 },
 indice_base: function(frm){
  if (  frm.doc.indice_base < 100 || frm.doc.indice_base >120){
   frm.set_value('indice_base', "")
}

 },

 estimation_prime_a_ceeder: function(frm){
 if (  frm.doc.estimation_prime_a_ceeder <= 0){
   frm.set_value('estimation_prime_a_ceeder', "")
}
 },
 assiette_primes: function(frm){
 if (  frm.doc.assiette_primes <= 0){
   frm.set_value('assiette_primes', "")
}
 },
 limite_en_coassurance: function(frm){
 if (  frm.doc.limite_en_coassurance <= 0 || frm.doc.limite_en_coassurance >100){
   frm.set_value('limite_en_coassurance', "")
}
 },

 taux_smp_min: function(frm){
 if (  frm.doc.taux_smp_min <= 0 || frm.doc.taux_smp_min >100){
   frm.set_value('taux_smp_min', "")
}
 },



forme_traite: function(frm){
if (frm.doc.forme_traite  && frm.doc.annee_effet && frm.doc.code_branche_traite){
   frm.set_value('identifiant_legal', frm.doc.forme_traite+"-"+frm.doc.annee_effet+"-"+frm.doc.code_branche_traite)
}else
{
frm.set_value('identifiant_legal', "")}
},

code_branche_traite: function(frm){
if (frm.doc.forme_traite  && frm.doc.annee_effet && frm.doc.code_branche_traite){
   frm.set_value('identifiant_legal', frm.doc.forme_traite+"-"+frm.doc.annee_effet+"-"+frm.doc.code_branche_traite)
}
else
{
frm.set_value('identifiant_legal', "")}

},
type_du_traite: function(frm){
if(frm.doc.type_du_traite == 'Non proportionnel'){
			   frm.set_value('periodicite_des_comptes', "Annuelle")

}
},
delai_envoi_comptes: function(frm) {
if (  frm.doc.delai_envoi_comptes < 10 || frm.doc.delai_envoi_comptes >90){
   frm.set_value('delai_envoi_comptes', "")

}
},
delai_bien_trouve: function(frm) {
if (  frm.doc.delai_bien_trouve < 10 || frm.doc.delai_bien_trouve >90){
   frm.set_value('delai_bien_trouve', "")

}
},
delai_reglement: function(frm) {
if (  frm.doc.delai_reglement < 10 || frm.doc.delai_reglement >90){
   frm.set_value('delai_reglement', "")

}
},
taux_dindexation: function(frm) {
if (  frm.doc.taux_dindexation < 5 || frm.doc.taux_dindexation >20){
   frm.set_value('taux_dindexation', "")

}

},
taux_dinflation_clause_index: function(frm) {
if (  frm.doc.taux_dinflation_clause_index < 5 || frm.doc.taux_dinflation_clause_index >20){
   frm.set_value('taux_dinflation_clause_index', "")

}

},

annee_base: function(frm) {
var annee_base = frm.doc.annee_base

if (/[^0-9]/.test(annee_base)){
   //iban1 = iban1.replace(/[^A-Z0-9\s-_]/g, "")

   frm.set_value('annee_base', "")

}
},
annee_effet: function(frm) {
var annee_effet = frm.doc.annee_effet

if (/[^0-9]/.test(annee_effet)){
   //iban1 = iban1.replace(/[^A-Z0-9\s-_]/g, "")

   frm.set_value('annee_effet', "")

}
if (frm.doc.forme_traite  && frm.doc.annee_effet && frm.doc.code_branche_traite){


 frm.set_value('identifiant_legal', frm.doc.forme_traite+"-"+frm.doc.annee_effet+"-"+frm.doc.code_branche_traite)

}
else
{
frm.set_value('identifiant_legal', "")}

},
onload: function(frm) {
		frm.set_query('forme_traite', function(doc) {
			return {
				filters: {

					"type_de_traite": doc.type_traite
				}
			};
		});
	},
refresh: function(frm) {
/*
if(frm.doc.nom_traite && frm.is_new()){
var n =   frm.doc.nom_traite + "-"+ frm.doc.annee_effet_du_traite
frappe.db.get_value('Traite', n, 'nom_traite')
    .then(r => {
         frappe.throw(__("le traité " + n+ " existe déjà"));


    })
}
*/

if (frm.doc.duree_validite == 'Renouvelable'){



	frm.add_custom_button(__('Renouveler'), function(){
	frappe.call({
    method: "appre.cession_conventionnelle.doctype.traite.btn_renouvelable.renouveller", //dotted path to server method
args: {
    'docname':  frm.doc.name,

    },    callback: function(r) {
      //  frappe.msgprint(r.message)
    }
});
    });}

        frm.call('get_section').then(r => {
           if (r.message) {
         if (!frm.is_new()) {


		if (frm.fields_dict["section_html"] && "contact_list" in frm.doc.__onload) {
			$(frm.fields_dict["section_html"].wrapper)
				.html(frappe.render_template("section", frm.doc.__onload))
				.find(".btn-contact")
				.on("click", function () {
					frappe.new_doc("Section");
				});
		}


		} else {
      frm.fields_dict["section_html"] && $(frm.fields_dict["section_html"].wrapper).html("");
		}
}
        })
},

validate: function(frm) {

if(frm.doc.delai_envoi_comptes<= 0){
     frappe.throw(__("Veuillez saisir le délai d'envoi des comptes"))

}

if(frm.doc.delai_bien_trouve<= 0){
     frappe.throw(__("Veuillez saisir le délai du bien trouvé"))

}
if(frm.doc.delai_reglement<= 0){
     frappe.throw(__("Veuillez saisir le délai de règlement"))

}
if(frm.doc.type_traite=="Proportionnel" && frm.doc.estimation_prime_a_ceeder<= 0){

     frappe.throw(__("Veuillez saisir l'estimation de la prime à  céder"))

}



 var date_effet = frm.doc.date_effet
 	   // var year = date_effet.getYear()
 	  //  const d = new date_effet
 	  const date_jour = new Date()

 	  let year_jour = date_jour.getFullYear()
 	  let month_jour= date_jour.getMonth()
 	  var y_15 = parseInt(year_jour)
 	  var m_3 = parseInt(month_jour)
 	  m_3 = m_3 + 3

 	  y_15= y_15 -15

 	  const date = new Date(date_effet)
 	  const years = date.getFullYear()

 	   	var y_3 =  parseInt(years)
 	   	y_3 = y_3+ 3

 	   let month= date.getMonth()
 	     if (month > m_3){

 	   	   	   frappe.throw(__("L’année de la date d'effet du traité doit être Inférieure 3 mois max de la date système" ))
}
 	   	  if (years <= y_15){

 	   	   frappe.throw(__("L’année de la date d'effet du traité doit être strictement supérieure à "+y_15))

}
   if (frm.doc.date_expiration){
    var date_expiration = frm.doc.date_expiration
    const date_exp = new Date(date_expiration)
    const years_exp = date_exp.getFullYear()
    // const newDate = addYears(date_exp, 3);


     	   if (years_exp > y_3){



     frappe.throw(__("l'année de la date d’expiration est doit être inférieure à "+y_3))
     }

   }

	},
});


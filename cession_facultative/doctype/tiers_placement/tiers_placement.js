// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt
frappe.ui.form.on("Tiers placement", {

 tiers_identique: function(frm){
 if (frm.doc.tiers_identique){
 frappe.db.get_value('Tiers placement', frm.doc.tiers_identique , ['type_de_commission'
 ,'montant_de_la_commission_forfaitaire', 'taux_de_commission', 'type_interessement',
 'taux', 'frais_de_gestion'])
    .then(r => {
        frm.set_value('type_de_commission', r.message.type_de_commission)
        frm.set_value('montant_de_la_commission_forfaitaire', r.message.montant_de_la_commission_forfaitaire)
        frm.set_value('taux_de_commission', r.message.taux_de_commission)
        frm.set_value('type_interessement', r.message.type_interessement)
        frm.set_value('taux', r.message.taux)
        frm.set_value('frais_de_gestion', r.message.frais_de_gestion)



    })
}
else if(frm.doc.tiers_identique == "") {
frm.set_value('type_de_commission', '')
        frm.set_value('montant_de_la_commission_forfaitaire', '')
        frm.set_value('taux_de_commission','')
        frm.set_value('type_interessement', '')
        frm.set_value('taux', '')
        frm.set_value('frais_de_gestion', '')
}
},


onload(frm){
 frm.set_query("tiers_identique", function() {


        return {
            "filters": {
                                "link_name": frm.doc.link_name,
            }
        }

    });


},
refresh(frm) {
 	  if (frm.doc.__islocal) {

			const last_doc = frappe.contacts.get_last_doc(frm);
			if (
				frappe.dynamic_link &&
				frappe.dynamic_link.doc &&
				frappe.dynamic_link.doc.name == last_doc.docname
			) {


				frm.set_value("link_doctype", frappe.dynamic_link.doctype);
				var links = frappe.dynamic_link.doc[frappe.dynamic_link.fieldname]


				frm.set_value("link_name", frappe.dynamic_link.doc[frappe.dynamic_link.fieldname]);

				//frm.set_value("le_taux_de_commission_de_liquidations","30");
				frappe.db.get_value('Section Placement', links , ['meme_condition', 'type_de_commission',
				'montant_de_la_commission_forfaitaire', 'taux_de_commission', 'type_interessement',
				'taux', 'frais_de_gestion'])
				  .then(r => {
     if(r.message.meme_condition== 1){
            frm.set_value('meme_condition_section', r.message.meme_condition)
            frm.set_value('type_de_commission', r.message.type_de_commission)
            frm.set_value('montant_de_la_commission_forfaitaire', r.message.montant_de_la_commission_forfaitaire)
            frm.set_value('taux_de_commission', r.message.taux_de_commission)
            frm.set_value('type_interessement', r.message.type_interessement)
            frm.set_value('taux', r.message.taux)
            frm.set_value('frais_de_gestion', r.message.frais_de_gestion)
            }
                })


}
		}

 	},
 	after_save: function (frm) {
	  //var tier = frm.doc.le_tiers
		frappe.run_serially([
			() => frappe.timeout(1),
			() => {
				const last_doc = frappe.contacts.get_last_doc(frm);
						if (
							last_doc.doctype == frm.doc.link_doctype &&
							last_doc.docname == frm.doc.link_name
						) {
							frappe.set_route("Form", last_doc.doctype, last_doc.docname);


				}
			},
		]);
	},
taux_de_commission: function(frm){
	var taux_de_commission = frm.doc.taux_de_commission

	if ( taux_de_commission> 50 || taux_de_commission <5){
	  	     frm.set_value('taux_de_commission', "")

   }
   },
   type_tiers: function(frm){
	    frm.set_value('code_du_tiers', "")

},
code_du_tiers: function(frm){
if (frm.doc.type_tiers == "Courtier"){
        				frappe.db.get_value('Courtier', frm.doc.code_du_tiers, ['etat']).then(r => {
        frm.set_value("etat_tiers",r.message.etat);


    })


        }else{
        				frappe.db.get_value('Reassureur', frm.doc.code_du_tiers, 'etat').then(r => {
        frm.set_value("etat_tiers",r.message.etat);



        })


        }

},


validate(frm ,cdt, cdn) {
    if (frm.doc.etat_tiers == "Black listé" && frm.doc.type_tiers == "Courtier"){

      frappe.throw(__("Le courtier "+ frm.doc.code_du_tiers+ " est blacklist"))

        }
  if (frm.doc.etat_tiers == "Black listé" && frm.doc.type_tiers == "Reassureur"){

                                 frappe.throw(__("Le réassureur "+ frm.doc.code_du_tiers+ " est blacklist" ))

        }
  if (frm.doc.etat_tiers == "Inactif" && frm.doc.type_tiers == "Reassureur"){

                                 frappe.throw(__("Le réassureur "+ frm.doc.code_du_tiers+ " est inactif" ))

        }
  if (frm.doc.etat_tiers == "Inactif" && frm.doc.type_tiers == "Courtier"){

                                 frappe.throw(__("Le courtier "+ frm.doc.code_du_tiers+ " est inactif" ))

        }
var taux_de_commission = frm.doc.taux_de_commission

	if ( (taux_de_commission> 50 || taux_de_commission < 5) && frm.doc.type_de_commission== "Taux" ){
 	    frappe.throw(__("Taux de commission doit être entre 5 et 50"))


   }
   var taux = frm.doc.taux

	if ( ( taux <= 0) && (frm.doc.type_interessement== "P.B sur le résultat" || frm.doc.type_interessement== "Bonification pour non sinistre" ) ){
 	    frappe.throw(__("Vuiellez saisir le taux"))


   }

	var la_part_du_tiers = frm.doc.la_part_du_tiers

	if ( la_part_du_tiers> 100 || la_part_du_tiers <= 0){
 	    frappe.throw(__("La part de tiers doit être entre 0 et 100"))


   }
    var part_signee = frm.doc.part_signee

	if ( part_signee> 100 || part_signee < 0){
 	    frappe.throw(__("La part de tiers signée doit être supérieur à 0"))


   }
           if (frm.doc.document_signe && part_signee <= 0 ){
            	    frappe.throw(__("La part de tiers signée doit être supérieur à 0"))
}
        var somme = 0
        if (frm.doc.type_tiers == "Courtier"){
 	    for (let row of frm.doc.part_de_chaque_réassureur_derrière_les_courtiers){
 	          somme = somme + row.part_du_reassureur
 	          }
 	    if( somme != frm.doc.la_part_du_tiers   ){
 	    frappe.throw(__("La part de courtier doit être égale aux cumuls des parts des réassureurs derrière"))
 	    }

}

},

// 	refresh(frm) {

// 	},
});
frappe.ui.form.on('Part reassureur derriere  courtiers placement', {
	part_de_chaque_réassureur_derrière_les_courtiers_add: function(frm){
		frm.fields_dict['part_de_chaque_réassureur_derrière_les_courtiers'].grid.get_field('reassureur').get_query = function(doc){
			let guardian_list = [];
			if(!doc.__islocal) guardian_list.push(doc.reassureur);
			$.each(doc.part_de_chaque_réassureur_derrière_les_courtiers, function(idx, val){
				if (val.reassureur) guardian_list.push(val.reassureur);
			});

			return { filters: [['Reassureur', 'name', 'not in', guardian_list]] };
		};
	}
});

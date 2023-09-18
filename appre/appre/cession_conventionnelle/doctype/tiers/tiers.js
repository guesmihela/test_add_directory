// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt

 frappe.ui.form.on("Tiers", {
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
				frappe.db.get_value('Section', links, 'type_traite')
    .then(r => {
        let values = r.message;
        frm.set_value("type_traite",values.type_traite);
    })
     frappe.db.get_value('Section', links , ['meme_condition'
 ,'type_de_la_commission', 'taux_de_commission','taux_de_la_surcommission',
  'echelle_de_commission', 'taux_commission_provisoire','base_de_calcul_des_interets', 'taux_interets',
    'pb_ou_pp','nature_de_la_pb','nature_de_la_pp', 'taux_de_la_pb','taux_echelonnee' , 'pp_fixe', 'pp_echelonnee',
    'bonification_pour_non_sinistre', 'taux_de_bonification'])
    .then(r => {
    if(r.message.meme_condition == 1){
            frm.set_value('meme_condition_section', r.message.meme_condition)
            frm.set_value('type_de_la_commission', r.message.type_de_la_commission)
            frm.set_value('taux_de_commission', r.message.taux_de_commission)
            frm.set_value('taux_de_la_surcommission', r.message.taux_de_la_surcommission)
            frm.set_value('echelle_de_commission', r.message.echelle_de_commission)
            frm.set_value('taux_commission_provisoire', r.message.taux_commission_provisoire)
            frm.set_value('base_de_calcul_des_interets', r.message.base_de_calcul_des_interets)
            frm.set_value('taux_interets', r.message.taux_interets)
            frm.set_value('pb_ou_pp', r.message.pb_ou_pp)
            frm.set_value('nature_de_la_pb', r.message.nature_de_la_pb)
            frm.set_value('nature_de_la_pp', r.message.nature_de_la_pp)
            frm.set_value('taux_de_la_pb', r.message.taux_de_la_pb)
            frm.set_value('taux_echelonnee', r.message.taux_echelonnee)
            frm.set_value('pp_fixe', r.message.pp_fixe)
            frm.set_value('pp_echelonnee', r.message.pp_echelonnee)
            frm.set_value('bonification_pour_non_sinistre', r.message.bonification_pour_non_sinistre)
            frm.set_value('taux_de_bonification', r.message.taux_de_bonification)





    }




    })



}
		}

 	},


validate(frm ,cdt, cdn) {
       if (frm.doc.etat_tiers == "Black listé" && frm.doc.type_tiers == "Courtier"){

      frappe.throw(__("Le courtier "+ frm.doc.le_tiers+ " est blacklist"))

        }
  if (frm.doc.etat_tiers == "Black listé" && frm.doc.type_tiers == "Reassureur"){

                                 frappe.throw(__("Le réassureur "+ frm.doc.le_tiers+ " est blacklist" ))

        }
   if (frm.doc.etat_tiers == "Inactif" && frm.doc.type_tiers == "Courtier"){

      frappe.throw(__("Le courtier "+ frm.doc.le_tiers+ " est inactif"))

        }
  if (frm.doc.etat_tiers == "Inactif" && frm.doc.type_tiers == "Reassureur"){

                                 frappe.throw(__("Le réassureur "+ frm.doc.le_tiers+ " est inactif" ))

        }
	var part_de_chaque_tiers = frm.doc.part_de_chaque_tiers

	if ( part_de_chaque_tiers> 100 || part_de_chaque_tiers <= 0){
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
 	    for (let row of frm.doc.part_de_chaque_reassureur_derriere_les_courtiers){
 	          somme = somme + row.part_de_reassureur}
 	    if( somme != frm.doc.part_de_chaque_tiers   ){
 	    frappe.throw(__("La part de courtier doit être égale aux cumuls des parts des réassureurs derrière"))
 	    }

}

},
 type_tiers: function(frm){
	    frm.set_value('le_tiers', "")

},
le_tiers: function(frm){
if (frm.doc.type_tiers == "Courtier"){
        				frappe.db.get_value('Courtier', frm.doc.le_tiers, ['etat']).then(r => {
        frm.set_value("etat_tiers",r.message.etat);


    })


        }else{
        				frappe.db.get_value('Reassureur', frm.doc.le_tiers, 'etat').then(r => {
        frm.set_value("etat_tiers",r.message.etat);



        })


        }

},


	taux_interets: function(frm){
	var taux_interets = frm.doc.taux_interets

	if ( taux_interets> 10 || taux_interets <1){
	  	     frm.set_value('taux_interets', "")

   }
   },


    taux_de_bonification: function(frm){
	var taux_de_bonification = frm.doc.taux_de_bonification

	if ( taux_de_bonification> 50 || taux_de_bonification <1){
	  	     frm.set_value('taux_de_bonification', "")

   }
   },

	after_save: function (frm) {
	  var tier = frm.doc.le_tiers
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
 tiers_identique: function(frm){
 if (frm.doc.tiers_identique){
 frappe.db.get_value('Tiers', frm.doc.tiers_identique , ['type_de_la_commission', 'taux_de_commission','taux_de_la_surcommission',
  'echelle_de_commission', 'taux_commission_provisoire','base_de_calcul_des_interets', 'taux_interets',
    'pb_ou_pp','nature_de_la_pb','nature_de_la_pp', 'taux_de_la_pb','taux_echelonnee' , 'pp_fixe', 'pp_echelonnee',
    'bonification_pour_non_sinistre', 'taux_de_bonification'])
    .then(r => {
frm.set_value('meme_condition_section', r.message.meme_condition)
            frm.set_value('type_de_la_commission', r.message.type_de_la_commission)
            frm.set_value('taux_de_commission', r.message.taux_de_commission)
            frm.set_value('taux_de_la_surcommission', r.message.taux_de_la_surcommission)
            frm.set_value('echelle_de_commission', r.message.echelle_de_commission)
            frm.set_value('taux_commission_provisoire', r.message.taux_commission_provisoire)
            frm.set_value('base_de_calcul_des_interets', r.message.base_de_calcul_des_interets)
            frm.set_value('taux_interets', r.message.taux_interets)
            frm.set_value('pb_ou_pp', r.message.pb_ou_pp)
            frm.set_value('nature_de_la_pb', r.message.nature_de_la_pb)
            frm.set_value('nature_de_la_pp', r.message.nature_de_la_pp)
            frm.set_value('taux_de_la_pb', r.message.taux_de_la_pb)
            frm.set_value('taux_echelonnee', r.message.taux_echelonnee)
            frm.set_value('pp_fixe', r.message.pp_fixe)
            frm.set_value('pp_echelonnee', r.message.pp_echelonnee)
            frm.set_value('bonification_pour_non_sinistre', r.message.bonification_pour_non_sinistre)
            frm.set_value('taux_de_bonification', r.message.taux_de_bonification)



    })
}
else if(frm.doc.tiers_identique == "") {
frm.set_value('type_de_la_commission', "")
            frm.set_value('taux_de_commission', "")
            frm.set_value('taux_de_la_surcommission', "")
            frm.set_value('echelle_de_commission', "")
            frm.set_value('taux_commission_provisoire', "")
            frm.set_value('base_de_calcul_des_interets', "")
            frm.set_value('taux_interets', "")
            frm.set_value('pb_ou_pp', "")
            frm.set_value('nature_de_la_pb', "")
            frm.set_value('nature_de_la_pp', "")
            frm.set_value('taux_de_la_pb', "")
            frm.set_value('taux_echelonnee', "")
            frm.set_value('pp_fixe', "")
            frm.set_value('pp_echelonnee', "")
            frm.set_value('bonification_pour_non_sinistre', "")
            frm.set_value('taux_de_bonification',"")
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


 });




frappe.ui.form.on( 'taux de PB  echelonnee',"taux_de_pb",function(frm, cdt, cdn)  {
            var i = 0

 	    for (let row of frm.doc.taux_echelonnee){
 	    i++
 	    }

   	    	var d = locals[cdt][cdn];
   	    	d.numéro_de_tranche= i
   	    	frm.refresh_field("taux_echelonnee")
   	    	i = i +1
});

frappe.ui.form.on('child reassurer', {
	part_de_chaque_reassureur_derriere_les_courtiers_add: function(frm){
		frm.fields_dict['part_de_chaque_reassureur_derriere_les_courtiers'].grid.get_field('code_reassurer').get_query = function(doc){
			let guardian_list = [];
			if(!doc.__islocal) guardian_list.push(doc.code_reassurer);
			$.each(doc.part_de_chaque_reassureur_derriere_les_courtiers, function(idx, val){
				if (val.code_reassurer) guardian_list.push(val.code_reassurer);
			});

			return { filters: [['Reassureur', 'name', 'not in', guardian_list]] };
		};
	}
});





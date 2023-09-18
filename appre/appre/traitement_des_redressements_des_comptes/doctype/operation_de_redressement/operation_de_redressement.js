// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt
frappe.ui.form.on("Operation de redressement", "onload", function(frm) {
    frm.set_query("code_section", function() {
if (frm.doc.type_cession =="Conventionnelle"){

        return {
            "filters": {
                                "link_name": frm.doc.id_traite,
            } }
        }
        else if(frm.doc.type_cession =="Facultative"){

        return {
            "filters": {
                                "link_name": frm.doc.id_placement,

            }  }
        };
    });
       frm.set_query("code_tiers", function() {


        return {
            "filters": {
                                "link_name": frm.doc.code_section,
            }
        }

    });
    frm.set_query('num_contrat', () => {
    return {
        query: 'appre.traitement_des_redressements_des_comptes.doctype.operation_de_redressement.operation_de_redressement.lead_query',
         "filters": {
                                "parent": frm.doc.code_section,
            }

    }
})
frm.set_query('code_securite', () => {
 if (frm.doc.type_tiers_section =="Courtier" && frm.doc.type_cession =="Conventionnelle"){

    return {
        query: 'appre.traitement_des_redressements_des_comptes.doctype.operation_de_redressement.operation_de_redressement.lead_courtier',
         "filters": {
                                "parent": frm.doc.code_tiers,
            }

    }
    }
      else if(frm.doc.type_tiers_section =="Courtier" && frm.doc.type_cession =="Facultative"){
       return {
        query: 'appre.traitement_des_redressements_des_comptes.doctype.operation_de_redressement.operation_de_redressement.lead_courtier_f',
         "filters": {
                                "parent": frm.doc.code_tiers,
            }

    }
      }
})


frm.set_query('code_securite', () => {


    return {
        query: 'appre.traitement_des_redressements_des_comptes.doctype.operation_de_redressement.operation_de_redressement.lead_courtier',
         "filters": {
                                "parent": frm.doc.code_tiers,
            }

    }
})



});
 frappe.ui.form.on("Operation de redressement", {

 code_tiers: function(frm){
 if (frm.doc.type_cession =="Conventionnelle"){
 frappe.db.get_value('Tiers', frm.doc.code_tiers , ['le_tiers','type_tiers'])
    .then(r => {
        frm.set_value('nom_tiers', r.message.le_tiers)
         frm.set_value('type_tiers_section', r.message.type_tiers)


    })
}
       else if(frm.doc.type_cession =="Facultative"){
       frappe.db.get_value('Tiers placement', frm.doc.code_du_tiers , ['code_du_tiers','type_tiers'])
    .then(r => {
        frm.set_value('nom_tiers', r.message.code_du_tiers)
         frm.set_value('type_tiers_section', r.message.type_tiers)


    })
}
 },

code_section: function(frm){
     	frm.set_value('code_tiers', '')

if (frm.doc.type_cession =="Conventionnelle"){

frappe.db.get_value('Section', frm.doc.code_section , ['code_risque_section', 'niveau_traite'])
    .then(r => {
        console.log(r.message.status) // Open
        frm.set_value('code_risque', r.message.code_risque_section)
     	frm.set_value('niveau_traite', r.message.niveau_traite)

    })
    }
       else if(frm.doc.type_cession =="Facultative"){
       frappe.db.get_value('Section Placement', frm.doc.code_de_la_section , ['code_branche', 'code_risque', 'type_placement'])
    .then(r => {
        console.log(r.message.status) // Open
        frm.set_value('code_risque', r.message.code_risque)
     	frm.set_value('type_placement', r.message.type_du_placement)
     	frm.set_value('code_branche', r.message.code_branche)


    })
    frappe.db.count('child contrat',  {filters: { parenttype: 'Section Placement', parent: frm.doc.code_section }})
    .then(count => {

     	frm.set_value('t',count)

    })


       }

},
id_traite: function(frm){
     	frm.set_value('code_section', '')
     	frm.set_value('code_tiers', '')

},
id_placement: function(frm){
     	frm.set_value('code_section', '')
     	frm.set_value('code_tiers', '')

},

type_cession: function(frm){
var type_cession = frm.doc.type_cession
     	frm.set_value('code_tiers', '')
     	frm.set_value('code_section', '')


if (type_cession =="Conventionnelle"){
     	frm.set_value('type_section', 'Section')
     	frm.set_value('type_tiers', 'Tiers')
      	frm.set_value('id_placement', '')

}
else if(type_cession =="Facultative"){
     	frm.set_value('type_section', 'Section Placement')
     	frm.set_value('type_tiers', 'Tiers placement')
     	frm.set_value('id_traite', '')

}
},


 });


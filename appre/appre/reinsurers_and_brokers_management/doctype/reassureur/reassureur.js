// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt

frappe.ui.form.on("Reassureur", {
   /*onload_post_render: function(frm) {
          // disable pointer events , keep non clickable
          frm.fields_dict['historique_traite'].grid.wrapper.find('.grid-row').css('pointer-events', 'none');
          // Get the list of fields you want to keep clickable
          var clickableFields = ['traite', 'section']; // Replace with the actual field names
          // Enable pointer events for the specified fields
          clickableFields.forEach(function(fieldname) {
            frm.fields_dict['historique_traite'].grid.wrapper.find(`[data-fieldname="${fieldname}"]`).css('pointer-events', 'auto').addClass('clickable-row');
          });
           //frm.fields_dict['historique_traite'].grid.wrapper.find('[data-fieldname="traite"], [data-fieldname="section"]').addClass('clickable-row');
           frm.fields_dict['historique_traite'].grid.wrapper.find('.clickable-row').on('click', function(event) {
             var doctype = $(event.target).attr('data-doctype');
             var fieldname = $(event.target).attr('data-value');
             event.preventDefault();
             //frappe.set_route("Form", doctype, fieldname);
           });
  },*/
  refresh(frm) {
    if(!frm.is_new()){
        setTimeout(function () {
            $('.grid-heading-row .sortable-handle, .grid-body .sortable-handle').hide();
            $('div[class="col grid-static-col d-flex justify-content-center"]').remove();
            $('div[class="col"]').remove();
       }, 500);
       frappe.call({
	     method:'appre.reinsurers_and_brokers_management.doctype.reassureur.reassureur.histo_traite',
         args: {
          code : frm.doc.reinsurer_code
         },
       }).then(r => {
         if(r.message)
		 {
		   frm.clear_table('historique_traite');
		   $.each(r.message, function(i,item){
             frm.add_child('historique_traite',item);
           });
           frm.refresh_field('historique_traite');
         }
       });
      frappe.call({
	     method:'appre.reinsurers_and_brokers_management.doctype.reassureur.reassureur.histo_plcmnt',
         args: {
          code : frm.doc.reinsurer_code,
         },
       }).then(r => {
         if(r.message)
		 {
		    frm.clear_table('historique_placement');
		    $.each(r.message, function(i,item_placmnt){
             frm.add_child('historique_placement',item_placmnt);
           });
           frm.refresh_field('historique_placement');
         }
       });
       frappe.call({
	     method:'appre.reinsurers_and_brokers_management.doctype.reassureur.reassureur.get_traite_nbr_per_year',
         args: {
          code : frm.doc.reinsurer_code,
         },
       }).then(r => {
         if(r.message)
		 {
		    // Données pour l'histogramme
		    var donnees = r.message
		    // Initialiser l'histogramme avec Frappe
		    var histogramme = new frappe.Chart("#histo", {
               title: __('Number of treaties per year'),
               data: {
                 labels: donnees.map(function(d) { return d.annee;}),
                 datasets: [
                 {
                   name: __('Number of treaties'),
                   values: donnees.map(function(d) { return d.Number_traite; }),
                 }
                 ]
               },
               type: "bar",
               colors: [
                 "blue"
               ],
               barOptions: {
                 stacked: false,
                 spaceRatio: 0
               }
               /*tooltipOptions: {
                 formatTooltipX: d => Math.round(d) // Round the values to integers in the tooltips
               }*/
            });
            // Render histogramme
            histogramme.draw();
         }
       });
    }
    $('#no_result p').append(__('No Data'));
  },
validate(frm ,cdt, cdn) {

if(frm.doc.compte_general){
var compte_general = frm.doc.compte_general
frappe.db.get_single_value('Compte comptable', 'taille_compte_general')

    .then(taille_compte_general => {
    let taille = taille_compte_general
    let length = compte_general.length;

if (taille != length){
           frappe.throw(__('Le numéro de compte général doit respecter toujours la taille du compte général'))
}

})
}
if(frm.doc.compte_auxiliaire){
var compte_auxiliaire = frm.doc.compte_auxiliaire
frappe.db.get_single_value('Compte comptable', 'taille_compte_auxiliaire')

    .then(taille_compte_auxiliaire => {
    let taille_au = taille_compte_auxiliaire
    let length_au = compte_auxiliaire.length;

if (taille_au != length_au){
           frappe.throw(__('Le numéro de compte auxiliaire doit respecter toujours la taille du compte auxiliaire'))
}

})
}



     if (frm.doc.donnees_fiscales){

 	    for (let row of frm.doc.donnees_fiscales){

 	    var date_effet = row.date_effet
 	   // var year = date_effet.getYear()
 	  //  const d = new date_effet
 	  const d = new Date()
 	  const date = new Date(date_effet)
 	  const years = date.getFullYear()
 	//  const newDate = addOneYear(d)
      let day = d.getFullYear()
 	 // const y = newDate.getFullYear()

 	  if (years <= 2010){
 	   frappe.throw(__("L’année de la date d'effet d'application de la taxe doit être strictement supérieure à 2010"))

 	  }
 	  if (years > 2024){
 	  frappe.throw(__("L’année de la date d'effet d'application de la taxe doit être inférieure ou égale à 2024" ))
 	  }




 	    var tax_rate = row.taux_de_la_taxe.toString()
 	    var exoneration_de_la_taxe = row.exoneration_de_la_taxe
 	    const words = tax_rate.split('.');
 	    let a = parseInt(words[0]);

 	    if (exoneration_de_la_taxe == "Non"){
 	    if (a < 5 || a> 30 ){
 	       frappe.throw(__("Veuillez vérifier le taux de la tax"))
 	    }
 	    if (words.length == 2){
 	       let b = parseInt(words[1]);
 	       if (b!= 25 && b != 75 && b != 5  ){
 	       frappe.throw(__("Veuillez vérifier le taux de la tax"))

 	       }


 	    }

 	    }
 	    }
}




	}


// 	refresh(frm) {

// 	},
});
frappe.ui.form.on('child fiscal', {
   	taux_de_la_taxe: function(frm, cdt, cdn) {
   	    	var d = locals[cdt][cdn];
   	    	 // frappe.msgprint("tr"+d.exoneration_de_la_taxe);
   	    	// t =74

   	    	//   frappe.throw(__('This is an Error Message'+d.taux_de_la_taxe))

   	    		//frm.toggle_reqd(cdt,cdn, "d.taux_de_la_taxe", true);


   	}
});

frappe.ui.form.on('child rating', {

	rating_add: function(frm, cdt, cdn){
		frm.fields_dict['rating'].grid.get_field('rating').get_query = function(doc){
			var topics_list = [];
			if(!doc.__islocal) topics_list.push(doc.name);
			$.each(doc.rating, function(idx, val){
				if (val.ratting) topics_list.push(val.rating);
			});
			   	    	var d = locals[cdt][cdn];


			return {
				filters:

				   [['Notation','rating_agency', 'like', d.rating_agency]]

			};
		};
	}

});
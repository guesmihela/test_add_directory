// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt
frappe.ui.form.on("Courtier", {
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
            code : frm.doc.broker_name
          },
       }).then(r => {
         if(r.message)
		 {
		   frm.clear_table('historique_traite');
		   $.each(r.message, function(i,d){
             var item = d;
             frm.add_child('historique_traite',item);
           });
           frm.refresh_field('historique_traite');
         }
       });
       frappe.call({
	     method:'appre.reinsurers_and_brokers_management.doctype.reassureur.reassureur.histo_plcmnt',
         args: {
           code : frm.doc.broker_name
         },
       }).then(r => {
          if(r.message)
		  {
		    frm.clear_table('historique_placement');
		    $.each(r.message, function(i,d){
              var item_placmnt = d;
              frm.add_child('historique_placement',item_placmnt);
            });
            frm.refresh_field('historique_placement');
          }
       });
       frappe.call({
	     method:'appre.reinsurers_and_brokers_management.doctype.reassureur.reassureur.get_traite_nbr_per_year',
         args: {
          code : frm.doc.broker_name
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

});

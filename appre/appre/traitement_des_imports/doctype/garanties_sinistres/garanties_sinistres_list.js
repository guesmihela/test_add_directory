
frappe.listview_settings['Garanties sinistres'] = {
	onload: function(listview) {
		listview.page.add_menu_item(__("Import"), function() {
		//listview.call_for_selected_items(method, {"status": "Open"});
          //   frappe.set_route('List', 'Data Import')
              	frappe.set_route("List", "Data Import", {"reference_doctype": 'Garanties sinistres'});

		});

listview.page.add_menu_item(__("Valider import"), function() {
		frappe.db.get_list("Garanties sinistres", {
            fields: ['name', 'periode_comptable',
                     'date_preparation_du_fichier',
                     'numero_de_sinistre',
                     'code_garantie',
                     'montant_de_sinistre_a_payer',
                     'montant_de_recours_a_encaisser'
                   ] ,
            filters: {
                        traiter:'False'
                        }
                     }).then(records => {
                     if (records.length == 0){
                               frappe.msgprint(__("Pas des données à traiter" ));

                     }

                       for (let i = 0; i < records.length; i++) {
                                frappe.db.insert({
                                    doctype: 'Recap garanties sinistres',

                                periode_comptable: records[i]['péeriode_comptable'],
                                    date_preparation_du_fichier: records[i]['date_preparation_du_fichier'],
                                    numero_de_sinistre: records[i]['numero_de_sinistre'],
                                    code_garantie : records[i]['code_garantie'],
                                    montant_de_sinistre_a_payer: records[i]['montant_de_sinistre_a_payer'],
                                    montant_de_recours_a_encaisser: records[i]['montant_de_recours_a_encaisser'],

}).then(r => {
//    console.log(doc);
frappe.db.set_value("Garanties sinistres", records[i]['name'], {
    traiter: 1}).then(r => {

    })

	frappe.set_route("List", "Recap garanties sinistres")
})
}
})
})


	}
}
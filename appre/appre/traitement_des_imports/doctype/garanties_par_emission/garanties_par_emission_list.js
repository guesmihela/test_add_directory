
frappe.listview_settings['Garanties par emission'] = {
	onload: function(listview) {
		listview.page.add_menu_item(__("Import"), function() {
		//listview.call_for_selected_items(method, {"status": "Open"});
          //   frappe.set_route('List', 'Data Import')
              	frappe.set_route("List", "Data Import", {"reference_doctype": 'Garanties par emission'});

		});
		listview.page.add_menu_item(__("Valider import"), function() {
		frappe.db.get_list('Garanties par emission', {
            fields: ['name', 'periode_comptable',
                     'date_preparation_du_fichier',
                     'code_garantie',
                     'cumulable_en_reassurance',
                     'capital_garantie',
                     'prime_garantie',
                     'commission_garantie',
                     'numero_emission',
                     'numero_du_contrat',
                     'numero_aliment',
                     'date_effect_operation'] ,
            filters: {
                        traiter:  0
                        }
                     }).then(records => {

                       for (let i = 0; i < records.length; i++) {
                               frappe.db.insert({
                                         doctype: 'Recap garanties par emission',
                                     periode_comptable: records[i]['periode_comptable'],
                                         date_de_traitement: records[i]['date_preparation_du_fichier'],
                                         code_garantie: records[i]['code_garantie'],
                                         cumulable_en_reassurance : records[i]['cumulable_en_reassurance'],
                                         capital_garantie: records[i]['capital_garantie'],
                                         prime_garantie: records[i]['prime_garantie'],
		                            commission_garantie: records[i]['commission_garantie'],
                                         numero_emission: records[i]['numero_emission'],
                                         numero_du_contrat: records[i]['numero_du_contrat'],
                                         numero_aliment: records[i]['numero_aliment'],
	                                 date_effet_operation: records[i]['date_effect_operation'],

}).then(r => {
//    console.log(doc);
frappe.db.set_value('Garanties par emission', records[i]['name'], {
    traiter: 1}).then(r => {

    })

	frappe.set_route("List", "Recap garanties par emission")
})
}
})
})
}
}

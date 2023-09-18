frappe.listview_settings['SAP et Recours a encaisser cadre'] = {
	onload: function(listview) {
		listview.page.add_menu_item(__("Import"), function() {
		//listview.call_for_selected_items(method, {"status": "Open"});
          //   frappe.set_route('List', 'Data Import')
              	frappe.set_route("List", "Data Import", {"reference_doctype": 'SAP et Recours a encaisser cadre'});

		});

listview.page.add_menu_item(__("Valider import"), function() {
						frappe.call({
    method: "appre.traitement_des_imports.doctype.sap_et_recours_a_encaisser_cadre.sap_et_recours_a_encaisser_cadre.sinistre_indiv", //dotted path to server method

    callback: function(r) {
         	frappe.set_route("List", "Recap SAP et Recours a encaisser")

      //  frappe.msgprint(r.message)
    }

});


		});

	}
}
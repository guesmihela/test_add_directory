frappe.listview_settings['prime emise individuel'] = {
	onload: function(listview) {
		listview.page.add_menu_item(__("Import"), function() {
		//listview.call_for_selected_items(method, {"status": "Open"});
          //   frappe.set_route('List', 'Data Import')
              	frappe.set_route("List", "Data Import", {"reference_doctype": 'prime emise individuel'});

		});

		listview.page.add_menu_item(__("Valider import"), function() {

			frappe.call({
    method: "appre.traitement_des_imports.doctype.prime_emise_individuel.prime_emise_individuel.primes_emises_indiv", //dotted path to server method

    callback: function(r) {
         	frappe.set_route("List", "Recap emission")


      //  frappe.msgprint(r.message)
    }

});


		});




	}
}
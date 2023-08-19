frappe.listview_settings['Prime emise cadre'] = {
	onload: function(listview) {
		listview.page.add_menu_item(__("Import"), function() {
		//listview.call_for_selected_items(method, {"status": "Open"});
          //   frappe.set_route('List', 'Data Import')
              	frappe.set_route("List", "Data Import", {"reference_doctype": 'Prime emise cadre'});

		});
		listview.page.add_menu_item(__("Valider import"), function() {

			frappe.call({
    method: "appre.traitement_des_imports.doctype.prime_emise_cadre.prime_emise_cadre.primes_emises_cadre", //dotted path to server method

    callback: function(r) {
         	frappe.set_route("List", "Recap emission")

      //  frappe.msgprint(r.message)
    }

});


		});



	},


}
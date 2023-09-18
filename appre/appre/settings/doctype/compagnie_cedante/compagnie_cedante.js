// Copyright (c) 2022, tnt and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Compagnie cedante", {
// 	refresh(frm) {

// 	},
// });

frappe.ui.form.on('adresse child', { // The child table is defined in a DoctType called "Dynamic Link"
    company_addresses_add(frm, cdt, cdn) { // "links" is the name of the table field in ToDo, "_add" is the event
        // frm: current ToDo form
        // cdt: child DocType 'Dynamic Link'
        // cdn: child docname (something like 'a6dfk76')
        // cdt and cdn are useful for identifying which row triggered this event


    }
});
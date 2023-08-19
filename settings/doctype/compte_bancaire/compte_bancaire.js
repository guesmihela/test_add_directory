// Copyright (c) 2022, tnt and contributors
// For license information, please see license.txt

frappe.ui.form.on("Compte Bancaire", {
country_code: function(frm) {
		if (frm.doc.country_code == "Tunisia") {
			frm.toggle_reqd("city1", true);
			frm.toggle_reqd("city2", false);
			frm.toggle_reqd("postal_code1", true);
			frm.toggle_reqd("postal_code2", false);


		}
		else {
			frm.toggle_reqd("city1", false);
			frm.toggle_reqd("city2", true);
			frm.toggle_reqd("postal_code1", false);
			frm.toggle_reqd("postal_code2", true);


		}
	},

 rib: function(frm) {
   var rib = frm.doc.rib

   if (/[^0-9]/.test(rib)){
   //iban1 = iban1.replace(/[^A-Z0-9\s-_]/g, "")

   frm.set_value('rib', "")

}
},

iban: function(frm) {
var iban1 = frm.doc.iban

if (/[^A-Z0-9\s-_]/.test(iban1)){
//iban1 = iban1.replace(/[^A-Z0-9\s-_]/g, "")

frappe.msgprint("Incorrect IBAN Code")
frm.set_value('iban', "")

}
else{

var der=iban1.substr(0, 4)
var deb=iban1.substr( 4)
var rearranger = deb + der
var i= 0
var newStr = rearranger.replace(/A/g, "10")
newStr = newStr.replace(/B/g, "11")
newStr = newStr.replace(/C/g, "12")
newStr = newStr.replace(/D/g, "13")
newStr = newStr.replace(/E/g, "14")
newStr = newStr.replace(/F/g, "15")
newStr = newStr.replace(/G/g, "16")
newStr = newStr.replace(/H/g, "17")
newStr = newStr.replace(/I/g, "18")
newStr = newStr.replace(/J/g, "19")
newStr = newStr.replace(/K/g, "20")
newStr = newStr.replace(/L/g, "21")
newStr = newStr.replace(/M/g, "22")
newStr = newStr.replace(/N/g, "23")
newStr = newStr.replace(/O/g, "24")
newStr = newStr.replace(/P/g, "25")
newStr = newStr.replace(/Q/g, "26")
newStr = newStr.replace(/R/g, "27")
newStr = newStr.replace(/S/g, "28")
newStr = newStr.replace(/T/g, "29")
newStr = newStr.replace(/U/g, "30")
newStr = newStr.replace(/V/g, "31")
newStr = newStr.replace(/W/g, "32")
newStr = newStr.replace(/X/g, "33")
newStr = newStr.replace(/Y/g, "34")
newStr = newStr.replace(/Z/g, "35")
newStr = newStr.replace(/ /g, "")
newStr = newStr.replace(/_/g, "")
newStr = newStr.replace(/-/g, "")

frm.set_value('iban_convert', newStr)

}
}


// 	refresh(frm) {

// 	},

});

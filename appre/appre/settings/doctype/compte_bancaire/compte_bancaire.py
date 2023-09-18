# Copyright (c) 2022, tnt and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _, throw
from frappe.model.naming import append_number_if_name_exists
from frappe.utils import cstr, has_gravatar

class CompteBancaire(Document):
	#pass
	def autoname(self):
		# concat first and last name
		self.name = "_".join(
			filter(None, [cstr(self.get(f)).strip() for f in ["bank_name", "rib"]])
		)

		#if frappe.db.exists("Contact", self.name):
		#	self.name = append_number_if_name_exists("Contacts", self.name)

	def validate(self):

		if self.iban:
				iban = self.iban_convert
				iban_int = int(iban)
				rest = iban_int % 97
				if 	rest != 1 :
					iban2 = str(rest)

					frappe.throw(_("Incorrect IBAN Code"))
# Copyright (c) 2023, tnt and contributors
# For license information, please see license.txt


import frappe
from frappe.model.document import Document

class SectionPlacement(Document):
	def onload(self):
		contact_list = []
		contact_list = frappe.get_list("Tiers placement", filters={"link_doctype": self.doctype, "link_name": self.name}, fields=["*"])
		for contact in contact_list:
			contact["reassurer"] = frappe.get_all(
				"Part reassureur derriere  courtiers placement",
				filters={"parenttype": "Tiers placement", "parent": contact.name},
				fields=["*"]
			)
		self.set_onload("contact_list", contact_list)

	@frappe.whitelist()
	def get_t_t(self):
		contact_list = frappe.get_list("Tiers placement", filters={"link_doctype": self.doctype, "link_name": self.name}, fields=["*"])
		for contact in contact_list:
			contact["reassurer"] = frappe.get_all(
				"Part reassureur derriere  courtiers placement",
				filters={"parenttype": "Tiers placement", "parent": contact.name},
				fields=["*"]
			)
		if self.num_section:
			tiers_list = frappe.get_list("Tiers placement", filters={"link_doctype": self.doctype, "link_name": self.name},
										 fields=["part_signee"])
			somme = 0
			for tiers in tiers_list:
				somme = somme + tiers.part_signee
			self.somme_tiers = somme

		self.set_onload("contact_list", contact_list)


	def validate(self):
		if not self.num_section:
			nb_section = frappe.db.count('Section Placement', {'link_name': self.link_name})
			nb_section = nb_section + 1
			self.num_section = str(nb_section)

	def before_save(self):
		if self.num_section:
			tiers_list = frappe.get_list("Tiers placement", filters={"link_doctype": self.doctype, "link_name": self.name},
										 fields=["part_signee"])
			somme = 0
			for tiers in tiers_list:
				somme = somme + tiers.part_signee
			self.somme_tiers = somme

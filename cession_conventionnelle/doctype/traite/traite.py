# Copyright (c) 2023, tnt and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Traite(Document):
	def validate(self):
		pass
	def onload(self):
		contact_list = frappe.get_list("Section", filters={"link_doctype": self.doctype, "link_name": self.name}, fields=["*"], order_by= "code_section")
		self.set_onload("contact_list", contact_list)

	@frappe.whitelist()
	def get_section(self):
		contact_list = frappe.get_list("Section", filters={"link_doctype": self.doctype, "link_name": self.name},
									   fields=["*"], order_by="code_section")

		self.set_onload("contact_list", contact_list)



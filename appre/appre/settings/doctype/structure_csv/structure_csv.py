# Copyright (c) 2023, tnt and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class StructureCSV(Document):
	pass
	@frappe.whitelist()
	def get_fiels(self, doctype):
		meta = frappe.get_meta(doctype)
		fields = meta.fields
		# columns = []
		# Set the child table entries on the "Structure File" document
		for field in fields:
			if field.fieldtype not in ["HTML", "Table", "Column Break", "Section Break"]:
				row = self.append('champs', {})
				row.column_name = field.fieldname
				row.ordre = ""
		return fields
	def autoname(self):
		self.name = self.structure_name

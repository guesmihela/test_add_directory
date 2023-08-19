# Copyright (c) 2023, tnt and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Operationderedressement(Document):
	pass
@frappe.whitelist()
@frappe.validate_and_sanitize_search_inputs

def lead_query(doctype, txt, searchfield, start, page_len, filters):
	if filters and filters.get("parent"):
		cond = """(`boi`.parent = %s )""" % (
			frappe.db.escape(filters.get("parent"))
		)

	return frappe.db.sql(
		"""select numero_du_contrat , parent
        from `tabchild contrat` boi
        where
            boi.parenttype = 'Section Placement'
            and {cond} 
            """.format(
			cond=cond
		)
	)
@frappe.whitelist()
@frappe.validate_and_sanitize_search_inputs

def lead_courtier( doctype, txt, searchfield, start, page_len, filters):
	if filters and filters.get("parent"):
		cond = """(`re`.parent = %s )""" % (
			frappe.db.escape(filters.get("parent"))
		)

	return frappe.db.sql(
		"""select code_reassurer , code_reassurer
        from `tabchild reassurer` re
        where
            re.parenttype = 'Tiers'
            and {cond} 
            """.format(
			cond=cond
		)
	)

@frappe.whitelist()
@frappe.validate_and_sanitize_search_inputs

def lead_courtier_f(doctype, txt, searchfield, start, page_len, filters):
	if filters and filters.get("parent"):
		cond = """(`re`.parent = %s )""" % (
			frappe.db.escape(filters.get("parent"))
		)

	return frappe.db.sql(
		"""select reassureur , reassureur
        from `tabPart reassureur derriere  courtiers placement` re
        where
            re.parenttype = 'Tiers placement'
            and {cond} 
            """.format(
			cond=cond
		)
	)
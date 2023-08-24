# Copyright (c) 2023, tnt and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.naming import getseries

from frappe import _
from datetime import datetime

class Placementenreassurancefacultative(Document):
	def onload(self):
		contact_list = frappe.get_list("Section Placement", filters={"link_doctype": self.doctype, "link_name": self.name},fields=["*"] , order_by= "num_section")
		self.set_onload("contact_list", contact_list)

	def autoname(self):
		new_num_placement = ""

		if isinstance(self.date_effet, (int, str)) :
			datetime_object = datetime.strptime(self.date_effet, '%Y-%m-%d').date()
		else:
			datetime_object = self.date_effet
		exist = frappe.db.count('Placement en reassurance facultative')

		if not exist:
			new_num_placement = str(datetime_object.year) + '0001'
		else:
			plac_list = frappe.get_list("Placement en reassurance facultative",
									fields=["*"])
			count_p = 0
			for plac in plac_list:
				num = plac.num_placement
				anne_num = num[0:4:1]
				if int(anne_num) == datetime_object.year:
					count_p = count_p + 1
				indice = count_p + 1
				l = len(str(count_p))
				if indice <9:
					new_num_placement = str(datetime_object.year) + '000' + str(indice)
				elif indice > 9:
					new_num_placement = str(datetime_object.year) + '00' + str(indice)
				elif indice > 99:
					new_num_placement = str(datetime_object.year) + '0' + str(indice)
				elif indice > 999:
					new_num_placement = str(datetime_object.year) + str(indice)
		self.name= new_num_placement
		self.num_placement = new_num_placement

	@frappe.whitelist()
	def get_section(self):
		contact_list = frappe.get_list("Section Placement", filters={"link_doctype": self.doctype, "link_name": self.name}, fields=["*"],
									   order_by="num_section")

		self.set_onload("contact_list", contact_list)
		"""
	def autoname(self):
			# select a project name based on customer
			prefix = "P - {} - ".format(self.date_effet)
			self.name = getseries(prefix, 4)
	"""


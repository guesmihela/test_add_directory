import frappe
from frappe.model.document import Document
import functools
from frappe import _


class Section(Document):
    def onload(self):
        contact_list = []
        contact_list = frappe.get_all("Tiers", filters={"link_doctype": self.doctype, "link_name": self.name},
                                      fields=["*"])
        for contact in contact_list:
            contact["reassurer"] = frappe.get_all(
                "child reassurer",
                filters={"parenttype": "Tiers", "parent": contact.name},
                fields=["*"]
            )
        self.set_onload("contact_list", contact_list)

        branch_list = []
        branch_list = frappe.get_all("Branche assurance", fields=["*"])
        liste_child = []
        liste_child = frappe.get_all("Affectation des Produits et Garanties child",
                                     filters={"parenttype": "Section", "parent": self.name}, fields=["*"])
        branch_name = []
        for contact in branch_list:
            branch_name.append(contact.name)
        branch_child = []

        for branch in liste_child:
            branch_child.append(branch.produitsgaranties)
        item = set(branch_name)
        z = set(branch_child)
        res_list = item - z
        branch_cat_list = []
        for contact in branch_list:
            if contact.name in res_list:
                branch_cat_list.append(contact)
                sous_branche = frappe.get_all("Sous branche assurance", filters={"code_branch": contact.name},
                                              fields=["*"])
                sousbranch_name = []
                for child in sous_branche:
                    sousbranch_name.append(child.name)
                sousbranch_child = []

                for branch in liste_child:
                    sousbranch_child.append(branch.produitsgaranties)
                item = set(sousbranch_name)
                z = set(sousbranch_child)
                res1_list = item - z
                sous_branche1 = []
                for s_branche in sous_branche:
                    if s_branche.name in res1_list:
                        sous_branche1.append(s_branche)
                contact["sous_branche"] = sous_branche1
                for s_branche in sous_branche1:
                    categorie = frappe.get_all("Categorie ou produit", fields=["*"])
                    cat_name = []
                    for child in categorie:
                        cat_name.append(child.name)
                    categorie_child = []
                    for cat in liste_child:
                        categorie_child.append(cat.produitsgaranties)
                    item = set(cat_name)
                    z = set(categorie_child)
                    res2_list = item - z
                    categorie1 = []
                    Garantie = []
                    Guaranties = []
                    for cat in categorie:
                        if cat.name in res2_list:
                            categorie1.append(cat)
                            Garantie = frappe.get_all("child guarantee", filters={"parenttype": "Categorie ou produit",
                                                                                  "parent": cat.name}, fields=["*"])
                            for gar in Garantie:
                                verif = False
                                for child in liste_child:
                                    if (child.produitsgaranties == gar.code_guarantee) and (child.produit == cat.name):
                                        verif = True
                                if not verif:
                                    Guaranties.append(gar)

                    contact["garantie"] = Guaranties

                    contact["categorie"] = categorie1

        self.set_onload("branch_cat_list", branch_cat_list)

    @frappe.whitelist()
    def add_note(self, note, att, pro):
        if att == "Garantie":
            self.append("table_tree", {"affectation_de": att, "categorie_produit": "Garantie", "produit_garantie": note,
                                       "produit": pro})
        elif att == "Categorie ou produit":
            self.append("table_tree",
                        {"affectation_de": att, "categorie_produit": "Categorie ou produit", "produit_garantie": note})
        elif att == "Sous branche assurance":
            categorie = frappe.get_all("Categorie ou produit", filters={"under_insurance_branch": note}, fields=["*"])
            for cat in categorie:
                self.append("table_tree", {"affectation_de": att, "categorie_produit": "Categorie ou produit",
                                           "produitsgaranties": note, "produit_garantie": cat.name})
        elif att == "Branche assurance":
            categorie = frappe.get_all("Categorie ou produit", filters={"branche": note}, fields=["*"])
            for cat in categorie:
                self.append("table_tree", {"affectation_de": att, "categorie_produit": "Categorie ou produit",
                                           "produitsgaranties": note, "produit_garantie": cat.name})

        #	if att == "Garantie":
        #		self.append("table_tree",
        #					{"affectation_de": att, "categorie_produit": "Garantie", "produit_garantie": note,
        #					 "produit": pro})
        #	elif att == "Categorie ou produit":
        #		self.append("table_tree", {"affectation_de": att, "categorie_produit": "Categorie ou produit",
        #								   "produit_garantie": note})
        #	elif att == "Sous branche assurance":
        #		categorie = frappe.get_all("Categorie ou produit", filters={"under_insurance_branch": note},
        #								   fields=["*"])
        #		for cat in categorie:
        #			self.append("table_tree", {"affectation_de": att, "categorie_produit": "Categorie ou produit",
        #									   "produitsgaranties": note, "produit_garantie": cat.name})
        #	elif att == "Branche assurance":
        #		categorie = frappe.get_all("Categorie ou produit", filters={"branche": note}, fields=["*"])
        #		for cat in categorie:
        #			self.append("table_tree", {"affectation_de": att, "categorie_produit": "Categorie ou produit",
        #									   "produitsgaranties": note, "produit_garantie": cat.name})
        #	else:
        #
        #		self.append("table_tree", {"affectation_de": att, "produit_garantie": note})

        self.save()

    def before_save(self):
        if self.code_section:
            tiers_list = frappe.get_list("Tiers", filters={"link_doctype": self.doctype, "link_name": self.name},
                                         fields=["part_signee"])
            somme = 0
            for tiers in tiers_list:
                somme = somme + tiers.part_signee
            self.etat_tiers = somme

    @frappe.whitelist()
    def get_t_t(self):
        contact_list = frappe.get_list("Tiers", filters={"link_doctype": self.doctype, "link_name": self.name},
                                       fields=["*"])
        for contact in contact_list:
            contact["reassurer"] = frappe.get_all(
                "child reassurer",
                filters={"parenttype": "Tiers", "parent": contact.name},
                fields=["*"]
            )
        if self.code_section:
            tiers_list = frappe.get_list("Tiers", filters={"link_doctype": self.doctype, "link_name": self.name},
                                         fields=["part_signee"])
            somme = 0
            for tiers in tiers_list:
                somme = somme + tiers.part_signee
        self.etat_tiers = somme
        self.set_onload("contact_list", contact_list)

    def validate(self):
        if not self.code_section:
            nb_section = frappe.db.count('Section', {'link_name': self.link_name})
            nb_section = nb_section + 1
            self.code_section = str(nb_section)








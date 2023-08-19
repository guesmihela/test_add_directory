import frappe
from datetime import datetime, date, timedelta
@frappe.whitelist()
def renouveller(docname ):
        placement_list = frappe.get_list("Placement en reassurance facultative", filters={"name": docname},
                                               fields=["*"])
        for placement in placement_list:
            new_date_effet =placement.date_expiration + timedelta(days=1)
            c = frappe.db.count('Placement en reassurance facultative')
            plac_list = frappe.get_list("Placement en reassurance facultative",
                                             fields=["*"])
            count_p = 0
            for plac in plac_list:
                num = plac.num_placement
                anne_num = num[0:4:1]
                if int(anne_num) == new_date_effet.year :
                    count_p = count_p + 1
                indice = count_p + 1
                l = len(str(count_p))
                if indice  <10 :
                    new_num_placement = str(new_date_effet.year) + '000' + str(indice)
                elif indice >9:
                    new_num_placement = str(new_date_effet.year) + '00' + str(indice)
                elif indice > 99:
                    new_num_placement = str(new_date_effet.year) + '0' + str(indice)
                elif indice> 999:
                    new_num_placement = str(new_date_effet.year) + str(indice)

            doc = frappe.new_doc('Placement en reassurance facultative')
            doc.num_placement = new_num_placement
            doc.nature_placement ="Renouvellement"
            doc.code_client = placement.code_client
            doc.origine_du_placement = placement.name
            doc.nom_assure =placement.nom_assure
            doc.adresse_assure = placement.adresse_assure
            doc.activite_lassure =placement.activite_lassure
            doc.description_placement =placement.description_placement
            #doc.numero_avenant =placement.numero_avenant
            doc.caractere_placement = placement.caractere_placement
            doc.reference_programme =placement.reference_programme
            doc.date_effet = new_date_effet
            #doc.date_expiration = placement.date_expiration
            doc.parite = placement.parite
            doc.insert()


            monnaie_placement_list = frappe.get_all("monnaie placement",
                                                  filters={"parenttype": 'Placement en reassurance facultative', 'parent': placement.name},
                                                  fields=["*"])
            for monnaie_p in monnaie_placement_list:
                doc = frappe.new_doc('monnaie placement')
                doc.parenttype = "Placement en reassurance facultative"
                doc.parent = new_num_placement
                doc.idx = monnaie_p.idx
                doc.parentfield = "monnaie"
                doc.monnaie = monnaie_p.monnaie
                doc.insert()
                #####                    ----Section list ---------
                section_list = frappe.get_list("Section Placement", filters={"link_name": placement.name},
                                               fields=["*"])
                for sec in section_list:
                    new_nom_sec =  sec.nom_section + '-' + new_num_placement

                    contrat_list = frappe.get_list("child contrat",
                                                   filters={"parenttype": 'Section Placement',
                                                            'parent': sec.name},
                                                   fields=["*"])
                    for contrat in contrat_list:
                        doc = frappe.new_doc('child contrat')
                        doc.parenttype = "Section Placement"
                        doc.parent = new_nom_sec
                        doc.numero_du_contrat = contrat.numero_du_contrat
                        doc.produitsgaranties = contrat.code_produit
                        # doc.date_effet = contrat.date_effet
                        doc.nom_assure = contrat.nom_assure
                        doc.capitaux_a_100 = contrat.capitaux_a_100
                        doc.idx = contrat.idx
                        doc.parentfield = "contrats"
                        doc.insert()
                    doc = frappe.new_doc('Section Placement')
                    doc.nom_section = new_nom_sec
                    doc.code_branche = sec.code_branche
                    doc.link_name = new_num_placement
                    doc.num_section = sec.num_section
                    doc.code_risque =sec.code_risque
                    doc.type_placement = sec.type_placement
                    doc.capital_base_engagement_reas = sec.capital_base_engagement_reas
                    doc.priorite = sec.priorite
                    doc.portee = sec.portee
                    doc.prime_reassurance = sec.prime_reassurance
                    doc.part_cedee_fac = sec.part_cedee_fac
                    doc.delai_paiement = sec.delai_paiement
                    doc.type_tiers = sec.type_tiers
                    doc.tiers_aperiteur = sec.tiers_aperiteur
                    doc.somme_tiers = sec.somme_tiers
                    doc.validate_doc = sec.validate_doc
                    doc.meme_condition = sec.meme_condition
                    doc.type_de_commission =sec.type_de_commission
                    doc.montant_de_la_commission_forfaitaire = sec.montant_de_la_commission_forfaitaire
                    doc.taux_de_commission = sec.taux_de_commission
                    doc.type_interessement =sec.type_interessement
                    doc.taux = sec.taux
                    doc.frais_de_gestion =sec.frais_de_gestion
                    doc.link_doctype = sec.link_doctype
                    #doc.contrats
                    doc.insert()
                    
                    #####                    ----Tiers list ---------
                    tiers_list = frappe.get_list("Tiers placement", filters={"link_name": sec.name},
                                                       fields=["*"])
                    for tiers in tiers_list :
                        new_nom_tiers =  tiers.nom_tiers + '-' + new_nom_sec

                        doc = frappe.new_doc('Tiers placement')
                        doc.link_name = new_nom_sec
                        doc.nom_tiers = new_nom_tiers
                        doc.type_tiers = tiers.type_tiers
                        doc.code_du_tiers = tiers.code_du_tiers
                        doc.etat_tiers =tiers.etat_tiers
                        doc.la_part_du_tiers =tiers.la_part_du_tiers
                        doc.part_signee = tiers.part_signee
                        doc.document_signe = tiers.document_signe
                        doc.type_de_commission =tiers.type_de_commission
                        doc.montant_de_la_commission_forfaitaire = tiers.montant_de_la_commission_forfaitaire
                        doc.taux_de_commission = tiers.taux_de_commission
                        doc.type_interessement =tiers.type_interessement
                        doc.taux = tiers.taux
                        doc.frais_de_gestion = tiers.frais_de_gestion
                        doc.link_doctype =tiers.link_doctype
                        doc.insert()

                        part_reassurance_list = frappe.get_list("Part reassureur derriere  courtiers placement",
                                                       filters={"parenttype": 'Tiers placement',
                                                                'parent': tiers.name},
                                                       fields=["*"])
                        for part in part_reassurance_list:
                            doc = frappe.new_doc('Part reassureur derriere  courtiers placement')
                            doc.parenttype = "Tiers placement"
                            doc.parent = new_nom_tiers
                            doc.reassureur = part.reassureur
                            doc.part_du_reassureur = part.part_du_reassureur
                            doc.idx = part.idx
                            doc.parentfield = "part_de_chaque_réassureur_derrière_les_courtiers"
                            doc.insert()

        return new_num_placement







































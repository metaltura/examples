// The texts of the application, in the `boutique` namespace.
// Generated from the model: change the model, not this file.
export const resources = {
  fr: {
    boutique: {
      boutique: {
        route: {
          Document: {
            entityScreen: {
              title: 'Documents'
            }
          },
          Client: {
            entityScreen: {
              title: 'Clients'
            }
          },
          Commande: {
            entityScreen: {
              title: 'Commandes'
            }
          },
          LigneDeCommande: {
            entityScreen: {
              title: 'Ligne de commandes'
            }
          }
        },
        title: 'Boutique',
        Document: {
          title: 'Document'
        },
        Client: {
          title: 'Client'
        },
        Commande: {
          title: 'Commande'
        },
        LigneDeCommande: {
          title: 'Ligne de commande'
        }
      },
      DocumentScreen: {
        racine: {
          children: {
            ecran: {
              children: {
                gauche: {
                  children: {
                    liste: {
                      title: 'Liste',
                      children: {
                        siCoupee: {
                          children: {
                            coupee: {
                              text: 'Seuls les 100 premiers documents sont affichés.'
                            }
                          }
                        }
                      }
                    }
                  }
                },
                detail: {
                  children: {
                    fiche: {
                      title: 'Fiche',
                      children: {
                        siChoisi: {
                          children: {
                            grille: {
                              children: {
                                titreNumero: {
                                  text: 'Numero'
                                }
                              }
                            }
                          },
                          else: {
                            siSupprime: {
                              children: {
                                supprime: {
                                  text: 'Ce document a été supprimé'
                                }
                              },
                              else: {
                                aucun: {
                                  text: 'Aucun document choisi'
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    formulaire: {
                      title: 'Formulaire',
                      children: {
                        saisie: {
                          children: {
                            boutons: {
                              children: {
                                enregistrer: {
                                  text: 'Enregistrer'
                                },
                                siModifiable: {
                                  children: {
                                    nouveau: {
                                      text: 'Nouveau'
                                    },
                                    supprimer: {
                                      text: 'Supprimer'
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      DocumentList: {
        table: {
          columns: {
            numero: {
              title: 'Numero'
            }
          }
        }
      },
      ClientScreen: {
        racine: {
          children: {
            ecran: {
              children: {
                gauche: {
                  children: {
                    liste: {
                      title: 'Liste',
                      children: {
                        siCoupee: {
                          children: {
                            coupee: {
                              text: 'Seuls les 100 premiers documents sont affichés.'
                            }
                          }
                        }
                      }
                    }
                  }
                },
                detail: {
                  children: {
                    fiche: {
                      title: 'Fiche',
                      children: {
                        siChoisi: {
                          children: {
                            grille: {
                              children: {
                                titreNom: {
                                  text: 'Nom'
                                }
                              }
                            }
                          },
                          else: {
                            siSupprime: {
                              children: {
                                supprime: {
                                  text: 'Ce document a été supprimé'
                                }
                              },
                              else: {
                                aucun: {
                                  text: 'Aucun document choisi'
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    formulaire: {
                      title: 'Formulaire',
                      children: {
                        saisie: {
                          children: {
                            boutons: {
                              children: {
                                enregistrer: {
                                  text: 'Enregistrer'
                                },
                                siModifiable: {
                                  children: {
                                    nouveau: {
                                      text: 'Nouveau'
                                    },
                                    supprimer: {
                                      text: 'Supprimer'
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      ClientList: {
        table: {
          columns: {
            nom: {
              title: 'Nom'
            }
          }
        }
      },
      CommandeScreen: {
        racine: {
          children: {
            ecran: {
              children: {
                gauche: {
                  children: {
                    liste: {
                      title: 'Liste',
                      children: {
                        siCoupee: {
                          children: {
                            coupee: {
                              text: 'Seuls les 100 premiers documents sont affichés.'
                            }
                          }
                        }
                      }
                    }
                  }
                },
                detail: {
                  children: {
                    fiche: {
                      title: 'Fiche',
                      children: {
                        siChoisi: {
                          children: {
                            grille: {
                              children: {
                                titreTotal: {
                                  text: 'Total'
                                },
                                titreDate: {
                                  text: 'Date'
                                },
                                titreNumero: {
                                  text: 'Numero'
                                },
                                titreClient: {
                                  text: 'Client'
                                }
                              }
                            }
                          },
                          else: {
                            siSupprime: {
                              children: {
                                supprime: {
                                  text: 'Ce document a été supprimé'
                                }
                              },
                              else: {
                                aucun: {
                                  text: 'Aucun document choisi'
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    formulaire: {
                      title: 'Formulaire',
                      children: {
                        saisie: {
                          children: {
                            boutons: {
                              children: {
                                enregistrer: {
                                  text: 'Enregistrer'
                                },
                                siModifiable: {
                                  children: {
                                    nouveau: {
                                      text: 'Nouveau'
                                    },
                                    supprimer: {
                                      text: 'Supprimer'
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      CommandeList: {
        table: {
          columns: {
            total: {
              title: 'Total'
            },
            date: {
              title: 'Date'
            },
            numero: {
              title: 'Numero'
            },
            clientLabel: {
              title: 'Client'
            }
          }
        }
      },
      LigneDeCommandeScreen: {
        racine: {
          children: {
            ecran: {
              children: {
                gauche: {
                  children: {
                    liste: {
                      title: 'Liste',
                      children: {
                        siCoupee: {
                          children: {
                            coupee: {
                              text: 'Seuls les 100 premiers documents sont affichés.'
                            }
                          }
                        }
                      }
                    }
                  }
                },
                detail: {
                  children: {
                    fiche: {
                      title: 'Fiche',
                      children: {
                        siChoisi: {
                          children: {
                            grille: {
                              children: {
                                titreQuantite: {
                                  text: 'Quantite'
                                }
                              }
                            }
                          },
                          else: {
                            siSupprime: {
                              children: {
                                supprime: {
                                  text: 'Ce document a été supprimé'
                                }
                              },
                              else: {
                                aucun: {
                                  text: 'Aucun document choisi'
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    formulaire: {
                      title: 'Formulaire',
                      children: {
                        saisie: {
                          children: {
                            boutons: {
                              children: {
                                enregistrer: {
                                  text: 'Enregistrer'
                                },
                                siModifiable: {
                                  children: {
                                    nouveau: {
                                      text: 'Nouveau'
                                    },
                                    supprimer: {
                                      text: 'Supprimer'
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      LigneDeCommandeList: {
        table: {
          columns: {
            quantite: {
              title: 'Quantite'
            }
          }
        }
      }
    }
  },
  en: {
    boutique: {
      boutique: {
        route: {
          Document: {
            entityScreen: {
              title: 'Documents'
            }
          },
          Client: {
            entityScreen: {
              title: 'Clients'
            }
          },
          Commande: {
            entityScreen: {
              title: 'Commandes'
            }
          },
          LigneDeCommande: {
            entityScreen: {
              title: 'Ligne de commandes'
            }
          }
        },
        title: 'Boutique',
        Document: {
          title: 'Document'
        },
        Client: {
          title: 'Client'
        },
        Commande: {
          title: 'Commande'
        },
        LigneDeCommande: {
          title: 'Ligne de commande'
        }
      },
      DocumentScreen: {
        racine: {
          children: {
            ecran: {
              children: {
                gauche: {
                  children: {
                    liste: {
                      title: 'List',
                      children: {
                        siCoupee: {
                          children: {
                            coupee: {
                              text: 'Only the first 100 documents are shown.'
                            }
                          }
                        }
                      }
                    }
                  }
                },
                detail: {
                  children: {
                    fiche: {
                      title: 'Card',
                      children: {
                        siChoisi: {
                          children: {
                            grille: {
                              children: {
                                titreNumero: {
                                  text: 'Numero'
                                }
                              }
                            }
                          },
                          else: {
                            siSupprime: {
                              children: {
                                supprime: {
                                  text: 'This document has been deleted'
                                }
                              },
                              else: {
                                aucun: {
                                  text: 'No document selected'
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    formulaire: {
                      title: 'Form',
                      children: {
                        saisie: {
                          children: {
                            boutons: {
                              children: {
                                enregistrer: {
                                  text: 'Save'
                                },
                                siModifiable: {
                                  children: {
                                    nouveau: {
                                      text: 'New'
                                    },
                                    supprimer: {
                                      text: 'Delete'
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      DocumentList: {
        table: {
          columns: {
            numero: {
              title: 'Numero'
            }
          }
        }
      },
      ClientScreen: {
        racine: {
          children: {
            ecran: {
              children: {
                gauche: {
                  children: {
                    liste: {
                      title: 'List',
                      children: {
                        siCoupee: {
                          children: {
                            coupee: {
                              text: 'Only the first 100 documents are shown.'
                            }
                          }
                        }
                      }
                    }
                  }
                },
                detail: {
                  children: {
                    fiche: {
                      title: 'Card',
                      children: {
                        siChoisi: {
                          children: {
                            grille: {
                              children: {
                                titreNom: {
                                  text: 'Nom'
                                }
                              }
                            }
                          },
                          else: {
                            siSupprime: {
                              children: {
                                supprime: {
                                  text: 'This document has been deleted'
                                }
                              },
                              else: {
                                aucun: {
                                  text: 'No document selected'
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    formulaire: {
                      title: 'Form',
                      children: {
                        saisie: {
                          children: {
                            boutons: {
                              children: {
                                enregistrer: {
                                  text: 'Save'
                                },
                                siModifiable: {
                                  children: {
                                    nouveau: {
                                      text: 'New'
                                    },
                                    supprimer: {
                                      text: 'Delete'
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      ClientList: {
        table: {
          columns: {
            nom: {
              title: 'Nom'
            }
          }
        }
      },
      CommandeScreen: {
        racine: {
          children: {
            ecran: {
              children: {
                gauche: {
                  children: {
                    liste: {
                      title: 'List',
                      children: {
                        siCoupee: {
                          children: {
                            coupee: {
                              text: 'Only the first 100 documents are shown.'
                            }
                          }
                        }
                      }
                    }
                  }
                },
                detail: {
                  children: {
                    fiche: {
                      title: 'Card',
                      children: {
                        siChoisi: {
                          children: {
                            grille: {
                              children: {
                                titreTotal: {
                                  text: 'Total'
                                },
                                titreDate: {
                                  text: 'Date'
                                },
                                titreNumero: {
                                  text: 'Numero'
                                },
                                titreClient: {
                                  text: 'Client'
                                }
                              }
                            }
                          },
                          else: {
                            siSupprime: {
                              children: {
                                supprime: {
                                  text: 'This document has been deleted'
                                }
                              },
                              else: {
                                aucun: {
                                  text: 'No document selected'
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    formulaire: {
                      title: 'Form',
                      children: {
                        saisie: {
                          children: {
                            boutons: {
                              children: {
                                enregistrer: {
                                  text: 'Save'
                                },
                                siModifiable: {
                                  children: {
                                    nouveau: {
                                      text: 'New'
                                    },
                                    supprimer: {
                                      text: 'Delete'
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      CommandeList: {
        table: {
          columns: {
            total: {
              title: 'Total'
            },
            date: {
              title: 'Date'
            },
            numero: {
              title: 'Numero'
            },
            clientLabel: {
              title: 'Client'
            }
          }
        }
      },
      LigneDeCommandeScreen: {
        racine: {
          children: {
            ecran: {
              children: {
                gauche: {
                  children: {
                    liste: {
                      title: 'List',
                      children: {
                        siCoupee: {
                          children: {
                            coupee: {
                              text: 'Only the first 100 documents are shown.'
                            }
                          }
                        }
                      }
                    }
                  }
                },
                detail: {
                  children: {
                    fiche: {
                      title: 'Card',
                      children: {
                        siChoisi: {
                          children: {
                            grille: {
                              children: {
                                titreQuantite: {
                                  text: 'Quantite'
                                }
                              }
                            }
                          },
                          else: {
                            siSupprime: {
                              children: {
                                supprime: {
                                  text: 'This document has been deleted'
                                }
                              },
                              else: {
                                aucun: {
                                  text: 'No document selected'
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    formulaire: {
                      title: 'Form',
                      children: {
                        saisie: {
                          children: {
                            boutons: {
                              children: {
                                enregistrer: {
                                  text: 'Save'
                                },
                                siModifiable: {
                                  children: {
                                    nouveau: {
                                      text: 'New'
                                    },
                                    supprimer: {
                                      text: 'Delete'
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      LigneDeCommandeList: {
        table: {
          columns: {
            quantite: {
              title: 'Quantite'
            }
          }
        }
      }
    }
  }
}

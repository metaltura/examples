// The texts of the application, in the `bibliotheque` namespace.
// Generated from the model: change the model, not this file.
export const resources = {
  fr: {
    bibliotheque: {
      bibliotheque: {
        route: {
          Auteur: {
            entityScreen: {
              title: 'Auteurs'
            }
          },
          Livre: {
            entityScreen: {
              title: 'Livres'
            }
          },
          Lecteur: {
            entityScreen: {
              title: 'Lecteurs'
            }
          }
        },
        title: 'Bibliotheque',
        Auteur: {
          title: 'Auteur'
        },
        Livre: {
          title: 'Livre'
        },
        Lecteur: {
          title: 'Lecteur'
        }
      },
      AuteurScreen: {
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
      AuteurList: {
        table: {
          columns: {
            nom: {
              title: 'Nom'
            }
          }
        }
      },
      LivreScreen: {
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
                                titreTitre: {
                                  text: 'Titre'
                                },
                                titreAuteur: {
                                  text: 'Auteur'
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
      LivreList: {
        table: {
          columns: {
            titre: {
              title: 'Titre'
            },
            auteurLabel: {
              title: 'Auteur'
            }
          }
        }
      },
      LecteurScreen: {
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
                                },
                                titreCourriel: {
                                  text: 'Courriel'
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
      LecteurList: {
        table: {
          columns: {
            nom: {
              title: 'Nom'
            },
            courriel: {
              title: 'Courriel'
            }
          }
        }
      }
    }
  },
  en: {
    bibliotheque: {
      bibliotheque: {
        route: {
          Auteur: {
            entityScreen: {
              title: 'Auteurs'
            }
          },
          Livre: {
            entityScreen: {
              title: 'Livres'
            }
          },
          Lecteur: {
            entityScreen: {
              title: 'Lecteurs'
            }
          }
        },
        title: 'Bibliotheque',
        Auteur: {
          title: 'Auteur'
        },
        Livre: {
          title: 'Livre'
        },
        Lecteur: {
          title: 'Lecteur'
        }
      },
      AuteurScreen: {
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
      AuteurList: {
        table: {
          columns: {
            nom: {
              title: 'Nom'
            }
          }
        }
      },
      LivreScreen: {
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
                                titreTitre: {
                                  text: 'Titre'
                                },
                                titreAuteur: {
                                  text: 'Auteur'
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
      LivreList: {
        table: {
          columns: {
            titre: {
              title: 'Titre'
            },
            auteurLabel: {
              title: 'Auteur'
            }
          }
        }
      },
      LecteurScreen: {
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
                                },
                                titreCourriel: {
                                  text: 'Courriel'
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
      LecteurList: {
        table: {
          columns: {
            nom: {
              title: 'Nom'
            },
            courriel: {
              title: 'Courriel'
            }
          }
        }
      }
    }
  }
}

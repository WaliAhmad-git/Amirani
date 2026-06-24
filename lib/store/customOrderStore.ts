import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  CustomOrder,
  CustomOrderDesign,
  CustomOrderMeasurements,
  CustomOrderContact,
  Fabric,
} from '@/lib/types'

const emptyDesign: CustomOrderDesign = {
  garmentType:      '',
  description:      '',
  colorPreference:  '',
  referenceImageUrl: undefined,
  modifications:    undefined,
}

const emptyMeasurements: CustomOrderMeasurements = {
  chest:    '',
  waist:    '',
  hips:     '',
  length:   '',
  shoulder: '',
  sleeve:   '',
  unit:     'cm',
  height:   '',
  weight:   '',
}

const emptyContact: CustomOrderContact = {
  name:       '',
  email:      '',
  phone:      '',
  street:     '',
  city:       '',
  postalCode: '',
  country:    '',
  notes:      '',
}

interface CustomOrderStore {
  fabric:       Fabric | null
  design:       CustomOrderDesign
  measurements: CustomOrderMeasurements
  contact:      CustomOrderContact

  setFabric:        (fabric: Fabric | null) => void
  setDesign:        (design: Partial<CustomOrderDesign>) => void
  setMeasurements:  (m: Partial<CustomOrderMeasurements>) => void
  setContact:       (c: Partial<CustomOrderContact>) => void
  resetOrder:       () => void

  // Computed: returns the full order object
  getOrder: () => CustomOrder
}

export const useCustomOrderStore = create<CustomOrderStore>()(
  persist(
    (set, get) => ({
      fabric:       null,
      design:       emptyDesign,
      measurements: emptyMeasurements,
      contact:      emptyContact,

      setFabric: (fabric) => set({ fabric }),

      setDesign: (patch) =>
        set(s => ({ design: { ...s.design, ...patch } })),

      setMeasurements: (patch) =>
        set(s => ({ measurements: { ...s.measurements, ...patch } })),

      setContact: (patch) =>
        set(s => ({ contact: { ...s.contact, ...patch } })),

      resetOrder: () =>
        set({
          fabric:       null,
          design:       emptyDesign,
          measurements: emptyMeasurements,
          contact:      emptyContact,
        }),

      getOrder: (): CustomOrder => {
        const { fabric, design, measurements, contact } = get()
        return { fabric, design, measurements, contact }
      },
    }),
    {
      name:    'amirani-custom-order',
      version: 1,
    }
  )
)

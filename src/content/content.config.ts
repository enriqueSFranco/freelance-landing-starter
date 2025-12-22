// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

// 4. Define your collection(s)
const barber = defineCollection({
    schema: z.object({
        photo: z.string().optional(),
        firstName: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(50, "El nombre es demasiado largo"),
        lastName: z.string().trim().min(2, "El apellido debe tener al menos 2 caracteres").max(50, "El apellido es demasiado largo"),
        seniority: z.enum([
            "Aprendiz",      // En formación
            "Barbero",       // Nivel estándar
            "Pro Barber",    // Alta experiencia
            "Master Barber"  // Máximo nivel / Educador
        ], {errorMap: () => ({message: "Selecciona un rango válido: Aprendiz, Barbero, Pro Barber o Master Barber"})}),
        presentation: z.string().min(10, "La presentación debe ser más descriptiva (mín. 10 caracteres)")
        .max(300, "La presentación no debe exceder los 300 caracteres"),
        instagram: z.string().startsWith("@", "El usuario debe empezar con @").optional(), // Redes sociales (ejemplo para Instagram)
        isActive: z.boolean().default(true) // Estado de disponibilidad
    })
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { barber };
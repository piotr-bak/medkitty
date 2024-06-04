import type { Medication } from "../../_types";

export async function addMedication(data: Medication) {
    try {
        const response = await fetch("/api/medications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            console.log("Medication added successfully!");
        } else {
            console.error("Failed to add medication:", response.statusText);
        }
    } catch (error) {
        console.error("Error adding medication:", error);
    }
}

// export async function updatePet(data: Pet) {
//     console.log("Update Pet data", data);
//     try {
//         const response = await fetch("/api/pets", {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });
//         if (response.ok) {
//             console.log("Pet updated successfully!");
//         } else {
//             console.error("Failed to add pet:", response.statusText);
//         }
//     } catch (error) {
//         console.error("Error adding pet:", error);
//     }
// }

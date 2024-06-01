import type { Pet } from "../_types";

export async function addPet(data: Pet) {
    try {
        const response = await fetch("/api/pets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                age: data.age,
                breed: data.breed,
            }),
        });
        if (response.ok) {
            console.log("Pet added successfully!");
        } else {
            console.error("Failed to add pet:", response.statusText);
        }
    } catch (error) {
        console.error("Error adding pet:", error);
    }
}

export async function updatePet(data: Pet) {
    console.log("Update Pet data", data);
    try {
        const response = await fetch("/api/pets", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: data.id,
                name: data.name,
                age: data.age,
                breed: data.breed,
            }),
        });
        if (response.ok) {
            console.log("Pet updated successfully!");
        } else {
            console.error("Failed to add pet:", response.statusText);
        }
    } catch (error) {
        console.error("Error adding pet:", error);
    }
}

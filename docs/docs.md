# MedKitty: Pet Medicine Administration App - Documentation

## Overview

This documentation provides an overview of the design decisions, implementations, and future considerations for MedKitty. The app allows users to manage the administration of medicines to pets, including tracking dosage and scheduling.

## Design Decisions

### Medicine Administration Tracking

#### Current Approach

In the MVP version, detailed schedules of pill administration are not stored. Instead, the app maintains:

-   **Last Administered Dose Timestamp**
-   **Next Dose Timestamp**
-   **Count of Administered Doses**

#### Rationale

This approach minimizes the amount of data stored, thereby reducing cloud storage costs. While this limits our ability to generate detailed reports and insights, it ensures the app remains cost-effective and scalable during initial deployment.

#### Validation

-   **Accuracy:** By not storing detailed administration logs, we save on storage costs and simplify the database structure, making it a valid trade-off for an MVP.
-   **Scalability:** The approach is more scalable in terms of storage, acknowledging the trade-offs in data granularity.

#### Additional Considerations

-   **Future Enhancement:** Detailed logging can be added later as a premium feature or when budget allows for increased storage costs.

#### Alternative Approach

-   **Detailed Logging:** Storing detailed logs of each administered dose would allow for comprehensive reporting and insights into the care provided to each pet.
-   **Drawbacks:** This would significantly increase the amount of data stored, leading to higher cloud storage costs and potentially more complex database management.
-   **Conclusion:** For the MVP, the chosen approach balances functionality and cost. However, detailed logging remains a viable future enhancement.

### Frontend/Backend Responsibility

#### Current Approach

To manage cloud costs effectively, some computations are performed on the frontend, particularly:

-   **Next Dose Administration Time:** Calculated on the frontend. Server time is checked at startup/load and periodically during use to prevent manipulation.
-   **Remaining Doses Count:** Calculated on the frontend with minimal risk and no need for special control checks.

#### Rationale

Performing these calculations on the frontend reduces server load and operational costs. Modern devices can handle these calculations without impacting user experience. Server time checks ensure reliability and prevent potential time manipulation issues.

#### Validation

-   **Accuracy:** Performing these calculations on the frontend can reduce server load and costs, especially for computationally light and infrequent operations.
-   **User Experience:** Modern devices can handle these calculations without performance issues.

#### Security Measures

-   **Server Time Checks:** Periodically checking server time ensures synchronization and prevents inaccuracies due to system time manipulation. Server time takes precedence if discrepancies are found.

#### Future Considerations

-   **Backend Calculations:** As the app scales, we may re-evaluate the cost-benefit of moving these calculations to the backend, especially if user base growth or increased data demands justify the change.

#### Alternative Approach

-   **Backend Calculations:** Performing all calculations on the backend would centralize logic, potentially simplifying the frontend and enhancing security.
-   **Drawbacks:** This approach could increase cloud costs due to higher server load and computational demands. It might also introduce latency issues.
-   **Conclusion:** The chosen approach for the MVP is more cost-effective and scalable. Backend calculations remain a viable option as the app grows and additional resources become available.

## Database Schema

### Users Table

| Column Name | Type    | Description                                 |
| ----------- | ------- | ------------------------------------------- |
| user_id     | Integer | Primary Key                                 |
| username    | String  | Username of the user                        |
| email       | String  | Email address of the user                   |
| password    | String  | Hashed password of the user                 |
| google_id   | String  | Google OAuth unique identifier for the user |
| role        | String  | User role and privilages (admin/non-admin)  |

### Pets Table

| Column Name | Type    | Description                         |
| ----------- | ------- | ----------------------------------- |
| pet_id      | Integer | Primary Key                         |
| pet_name    | String  | Name of the pet                     |
| breed       | String  | Breed of the pet                    |
| age         | Integer | Age of the pet                      |
| owners      | Integer | Foreign Key referencing Users table |

### Medicines Table

| Column Name     | Type    | Description                                                  |
| --------------- | ------- | ------------------------------------------------------------ |
| medicine_id     | Integer | Primary Key                                                  |
| medicine_name   | String  | Name of the medicine                                         |
| packaging_doses | Integer | Total number of doses in the package                         |
| packaging_unit  | String  | Unit of the doses (e.g., 'pieces', 'mg', 'ml', 'injections') |

### MedicationSchedule Table

| Column Name         | Type      | Description                                   |
| ------------------- | --------- | --------------------------------------------- |
| schedule_id         | Integer   | Primary Key                                   |
| pet_id              | Integer   | Foreign Key referencing Pets table            |
| medicine_id         | Integer   | Foreign Key referencing Medicines table       |
| dosage              | Number    | Dosage of the medicine                        |
| interval_minutes    | Integer   | Dosage interval in minutes                    |
| last_administered   | Timestamp | Timestamp of the last administered dose       |
| next_administration | Timestamp | Timestamp of the next dose to be administered |
| administered_count  | Integer   | Count of doses already administered           |

## Conclusion

By balancing the immediate needs of our MVP with future scalability and enhancements, we ensure that the MedKitty remains cost-effective and user-friendly. We will continuously assess and improve the app based on user feedback and scaling requirements.

---

_This documentation will be updated as the app evolves and new features are added._

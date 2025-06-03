-- CreateTable
CREATE TABLE "User" (
    "id_user" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id_admin" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "course" VARCHAR(150) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "Event" (
    "id_event" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "location" VARCHAR(200) NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,
    "sponsor_pitch" VARCHAR(1000) NOT NULL,
    "responsible_course" VARCHAR(255) NOT NULL,
    "id_admin" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id_event")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id_activity" TEXT NOT NULL,
    "id_event" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT NOT NULL,
    "speaker" VARCHAR(100) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" VARCHAR(10) NOT NULL,
    "slots" INTEGER NOT NULL,
    "workload" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id_activity")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id_enrollment" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_activity" TEXT NOT NULL,
    "enrollment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(30) NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id_enrollment")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id_payment" TEXT NOT NULL,
    "id_enrollment" TEXT NOT NULL,
    "transaction_id" VARCHAR(100) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "method" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id_payment")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id_certificate" TEXT NOT NULL,
    "id_enrollment" TEXT NOT NULL,
    "student_name" VARCHAR(100) NOT NULL,
    "activity_name" VARCHAR(150) NOT NULL,
    "workload" INTEGER NOT NULL,
    "issued_date" TIMESTAMP(3) NOT NULL,
    "validation_code" VARCHAR(50) NOT NULL,
    "pdf_link" VARCHAR(255) NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id_certificate")
);

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "cnpj" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "Admin"("id_admin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "Event"("id_event") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_id_activity_fkey" FOREIGN KEY ("id_activity") REFERENCES "Activity"("id_activity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_id_enrollment_fkey" FOREIGN KEY ("id_enrollment") REFERENCES "Enrollment"("id_enrollment") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_id_enrollment_fkey" FOREIGN KEY ("id_enrollment") REFERENCES "Enrollment"("id_enrollment") ON DELETE RESTRICT ON UPDATE CASCADE;

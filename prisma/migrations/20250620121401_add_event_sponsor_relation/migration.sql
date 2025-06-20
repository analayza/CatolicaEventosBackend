-- CreateTable
CREATE TABLE "EventSponsor" (
    "id" TEXT NOT NULL,
    "id_event" TEXT NOT NULL,
    "id_sponsor" TEXT NOT NULL,

    CONSTRAINT "EventSponsor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventSponsor_id_event_id_sponsor_key" ON "EventSponsor"("id_event", "id_sponsor");

-- AddForeignKey
ALTER TABLE "EventSponsor" ADD CONSTRAINT "EventSponsor_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "Event"("id_event") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSponsor" ADD CONSTRAINT "EventSponsor_id_sponsor_fkey" FOREIGN KEY ("id_sponsor") REFERENCES "Sponsor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

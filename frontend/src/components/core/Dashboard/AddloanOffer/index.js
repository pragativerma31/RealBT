import RenderSteps from "./RenderSteps"

export default function AddLoanOffer() {
  return (
    <>
      <div className="flex w-full items-start gap-x-6 h-full">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Add Loan Offer
          </h1>
          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>
        {/* Loan Offer Upload Tips */}
        <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
          <p className="mb-8 text-lg text-richblack-5">⚡ Loan Offer Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
            <li>Set the Loan Offer amount and interest rate.</li>
            <li>Define the loan tenure and repayment terms clearly.</li>
            <li>Upload required documents to verify the offer.</li>
            <li>Loan Offer Builder is where you create & organize a Loan Offer.</li>
            <li>
              Add details in the Loan Offer Builder section to include terms,
              conditions, and eligibility criteria.
            </li>
            <li>
              Information from the Additional Data section shows up on the
             Loan Offer single page.
            </li>
            <li>Make Announcements to notify any important updates.</li>
            <li>Notes to all interested applicants at once.</li>
          </ul>
        </div>
      </div>
    </>
  )
}

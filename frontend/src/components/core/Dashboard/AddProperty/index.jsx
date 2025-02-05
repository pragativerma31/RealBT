import RenderSteps from "./RenderSteps"

export default function AddProperty() {
  return (
    <>
      <div className="flex w-full items-start gap-x-6 h-full">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Add Property
          </h1>
          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>
        {/* Course Upload Tips */}
        <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
          <p className="mb-8 text-lg text-richblack-5">⚡ Property Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
            <li>Set the Property Price option.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the Property overview video.</li>
            <li>Property Builder is where you create & organize a Property.</li>
            <li>
              Add correct category of the property.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              Property single page.
            </li>
            <li>Make Announcements to notify any important</li>
        
          </ul>
        </div>
      </div>
    </>
  )
}

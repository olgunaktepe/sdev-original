'use client'
import useCalendar from "./useCalendar"
import SidePanel from "@/app/(admin)/apps/calendar/SidePanel";
import Calendar from "@/app/(admin)/apps/calendar/Calendar";
import AddEditEvent from "@/app/(admin)/apps/calendar/AddEditEvent";

const CalendarPage = () => {
    const {
        createNewEvent,
        onDateClick,
        onEventClick,
        onDrop,
        onEventDrop,
        events,
        show,
        onCloseModal,
        isEditable,
        eventData,
        onUpdateEvent,
        onRemoveEvent,
        onAddEvent
    } = useCalendar()
    return (
        <>
            <div className="col-xl-3">
                <SidePanel createNewEvent={createNewEvent}/>
            </div>
            <div className="col-xl-9">
                <Calendar events={events} onDateClick={onDateClick} onDrop={onDrop} onEventClick={onEventClick}
                          onEventDrop={onEventDrop}/>
            </div>
            <AddEditEvent eventData={eventData}
                          isEditable={isEditable}
                          onAddEvent={onAddEvent}
                          onRemoveEvent={onRemoveEvent}
                          onUpdateEvent={onUpdateEvent}
                          open={show}
                          toggle={onCloseModal}/>
        </>
    )
}

export default CalendarPage
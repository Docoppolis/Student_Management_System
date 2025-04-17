// util/timeBlockUtil.ts
export const timeBlockDict: Record<number, string> = {
    // Monday and Wednesday (MW)
    0: "8:00am - 9:15am MW",
    1: "9:30am - 10:45am MW",
    2: "11:00am - 12:15pm MW",
    3: "12:30pm - 1:45pm MW",
    4: "2:00pm - 3:15pm MW",
    5: "3:30pm - 4:45pm MW",

    // Tuesday and Thursday (TR)
    6: "8:00am - 9:15am TR",
    7: "9:30am - 10:45am TR",
    8: "11:00am - 12:15pm TR",
    9: "12:30pm - 1:45pm TR",
    10: "2:00pm - 3:15pm TR",
    11: "3:30pm - 4:45pm TR",

    // Friday (F)
    12: "8:00am - 9:15am F",
    13: "9:30am - 10:45am F",
    14: "11:00am - 12:15pm F",
    15: "12:30pm - 1:45pm F",
    16: "2:00pm - 3:15pm F",
    17: "3:30pm - 4:45pm F",
};



export function getClassTimeBlock(number: number): string {
    return timeBlockDict[number] || "Invalid time block";
}

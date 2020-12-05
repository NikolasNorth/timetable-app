import {Course, ICourse} from './api/models/course';

export const importCourses = (): void => {
    console.log('Running import...')
    const timetable = require('../data/timetable.json');
    timetable.forEach((course: any) => {
        importCourse(course);
    })
    console.log('Import complete.');
}

async function importCourse(course: any) {
    try {
        const courseExists: ICourse | null = await Course.findOne({
            subject: course['subject'],
            code: course['catalog_nbr'],
            classSection: course['course_info'][0].class_section,
        });
        if (courseExists) {
            console.log(`Course already exists: ${course['subject']} ${course['catalog_nbr']} (Skipped)`);
        } else {
            console.log(`Importing ${course['subject']} ${course['catalog_nbr']}`);
            const newCourse: ICourse = await Course.create({
                subject: course['subject'],
                code: course['catalog_nbr'],
                title: course['className'],
                classSection: course['course_info'][0].class_section,
                startTime: course['course_info'][0].start_time,
                endTime: course['course_info'][0].end_time,
                days: course['course_info'][0].days || [],
            });
            await newCourse.save();
        }
    } catch (err) {
        console.error(err);
    }
}

import {Router, Request, Response} from 'express';
import {IReview, Review} from '../models/review';
import {Course, ICourse} from '../models/course';
import { authenticate } from 'passport';

export const router = Router();

router.get('/course/:id', async (req: Request, res: Response) => {
    try {
        const course: ICourse | null = await Course.findById(req.params.id).exec();
        if (course) {
            res.status(200).json(course.reviews);
        } else {
            res.status(404).json({
                message: 'Course not found.'
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
})

router.post('/course/:id', authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
    try {
        const course: ICourse | null = await Course
            .findById(req.body.courseId).exec();
        if (course) {
            let review: IReview = await Review.create({
                title: req.body.title,
                description: req.body.description,
                authorId: req.body.authorId,
                dateOfPublish: Date.now(),
                isVisible: true,
                courseId: req.body.courseId,
            });
            course.reviews.push(review);
            review = await review.save();
            await course.save();
            res.status(201).json(review);
        } else {
            res.status(404).json({
                message: 'Course not found.'
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

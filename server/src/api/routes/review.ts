import {Router, Request, Response} from 'express';
import {IReview, Review} from '../models/review';
import {Course, ICourse} from '../models/course';
import { authenticate } from 'passport';

export const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const query: any = {};
        if (req.body.title) query.title = {
            $regex: req.body.title,
            $options: 'i'
        };
        if (req.body.courseId) query.courseId = req.body.courseId;
        if (req.body.authorId) query.authorId = req.body.authorId;
        const results: IReview[] = await Review.find(query).exec();
        res.status(200).json(results);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.post('/:id', async (req: Request, res: Response) => {
    try {
        let review: IReview | null = await Review.findById(req.params.id).exec();
        if (review) {
            review.isVisible = req.body.isVisible;
            review = await review.save();
            res.status(201).json(review);
        } else {
            res.status(404).json({
                message: 'Review not found.'
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
})

router.get('/course/:id', async (req: Request, res: Response) => {
    try {
        const reviews = await Review.find({courseId: req.params.id}).exec();
        if (reviews) {
            const visibleReviews = reviews.filter((r) => r.isVisible);
            res.status(200).json(visibleReviews);
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

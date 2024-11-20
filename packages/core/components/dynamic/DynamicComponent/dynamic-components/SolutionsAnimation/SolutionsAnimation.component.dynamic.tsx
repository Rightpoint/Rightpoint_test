import dynamic from 'next/dynamic'

export const SolutionsAnimationDynamic = dynamic(() =>
    import('./SolutionsAnimation.component').then(
        (mod) => mod.SolutionsAnimation
    )
)

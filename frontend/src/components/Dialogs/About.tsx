import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Button, IconButton, Tooltip } from "@mui/material";
import {
    BiLockAlt,
    BiLogoGithub,
    BiLogoMongodb,
    BiLogoNodejs,
    BiLogoReact,
    BiLogoTailwindCss,
    BiLogoTypescript,
} from "react-icons/bi";
type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function About({ isOpen, setIsOpen }: Props) {
    function close() {
        setIsOpen(false);
    }

    const Icon = ({ name, icon }: { name: string; icon: any }) => {
        return (
            <Tooltip title={name}>
                <IconButton color="inherit" size="large">{icon}</IconButton>
            </Tooltip>
        );
    };

    return (
        <>
            <Transition appear show={isOpen}>
                <Dialog as="div" className="relative z-10" onClose={close} __demoMode>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full border max-w-md rounded-xl bg-white min-w-[620px] p-6 backdrop-blur-2xl">
                                    <DialogTitle as="h3" className="text-2xl font-bold">
                                        About gotIdea
                                    </DialogTitle>
                                    <p className="mt-2 text-sm/6 text-justify">
                                        GotIdea empowers users to unleash their creativity by providing a
                                        platform where they can effortlessly generate and distribute their
                                        ideas. With a sleek and intuitive user interface crafted with React.js
                                        and TypeScript, users can seamlessly navigate the application, create
                                        new ideas, and explore those shared by others. On the backend, the
                                        robust combination of Node.js and Express.js ensures optimal
                                        performance and reliability. Leveraging the power of these
                                        technologies, GotIdea delivers a seamless user experience while
                                        handling data management, authentication, and other essential backend
                                        functionalities. Whether users are brainstorming new concepts, seeking
                                        inspiration, or collaborating with peers, GotIdea offers a dynamic
                                        environment where ideas flourish and connections are made. Join the
                                        GotIdea community today and start turning your imagination into
                                        reality.
                                    </p>
                                    <div className="mt-4 flex flex-col items-start gap-3">
                                        <h2 className="text-md font-bold">Technologies used</h2>
                                        <div className="flex justify-center items-center gap-2">
                                            <Icon name="Typescript" icon={<BiLogoTypescript />} />
                                            <Icon name="React" icon={<BiLogoReact />} />
                                            <Icon name="Node.js" icon={<BiLogoNodejs />} />
                                            <Icon name="MongoDB" icon={<BiLogoMongodb />} />
                                            <Icon name="Tailwind CSS" icon={<BiLogoTailwindCss />} />
                                            <Icon name="Authentication" icon={<BiLockAlt />} />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex flex-col items-start gap-3">
                                        <h2 className="text-md font-bold">Collaborators</h2>
                                        <div className="flex justify-center items-center gap-2">
                                            <h1 className="font-light"> 1. Ahmad Shaja AZIMI (Frontend & Backend)</h1>
                                            <a href="https://github.com/ahmadshaja">
                                                <Icon name="Github Link" icon={<BiLogoGithub />} /></a>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                            onClick={close}
                                        >
                                            Got it, thanks!
                                        </Button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

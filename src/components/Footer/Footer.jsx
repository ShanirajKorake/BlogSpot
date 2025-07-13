import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../Logo' 

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-black border-t-2 border-t-gray-700">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                            <div>
                                {/* <p className="text-sm text-gray-600 mt-20">
                                  Crafted by <a href="https://github.com/ShanirajKorake" className="text-blue-50">Shaniraj korake</a> 
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Footer